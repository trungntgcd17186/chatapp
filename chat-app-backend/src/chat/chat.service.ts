import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Conversation } from 'src/entities/conversation.entity';
import { Message } from 'src/entities/message.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private authService: AuthService,
  ) {}

  async createConversation(loggedUser: Users, emails: any): Promise<{ id: number; created_at: Date; members: Users[] }> {
    if (!emails.length) throw new NotFoundException('Empty email.');
    const users = await Promise.all(
      emails.map(async (emailDto) => {
        const userInfo = await this.authService.findByEmail(emailDto);
        if (!userInfo) {
          throw new NotFoundException(`User with email ${emailDto} not found.`);
        }
        return userInfo;
      }),
    );

    if (emails.length === 1) {
      const friendId = users[0].id;
      const conversation = await this.conversationRepository
        .createQueryBuilder('conversation')
        .leftJoin('conversation.members', 'members')
        .groupBy('conversation.id')
        .having('COUNT(members.id) = 2')
        .where('conversation.id IN ' + '(SELECT conversationId FROM conversation_members_users WHERE usersId = :loggedUserId)', {
          loggedUserId: loggedUser.id,
        })
        .andWhere('conversation.id IN ' + '(SELECT conversationId FROM conversation_members_users WHERE usersId = :friendId)', { friendId })
        .getOne();

      if (conversation) throw new ConflictException('You already have a conversation with this user.');
    }

    if (users.some((user) => user.id === loggedUser.id)) throw new NotFoundException('You cannot create a conversation with yourself.');

    const conversation = new Conversation();
    conversation.members = [loggedUser, ...users];

    await this.conversationRepository.save(conversation);
    return conversation;
  }

  async getListConversation(loggedUserId: number): Promise<any> {
    try {
      const conversations = await this.conversationRepository
        .createQueryBuilder('conversation')
        .leftJoinAndSelect('conversation.members', 'members')
        .leftJoinAndSelect(
          'conversation.messages',
          'messages',
          'messages.id = ' + '(SELECT m.id FROM message m WHERE m.conversationId = conversation.id ORDER BY m.created_at DESC LIMIT 1)',
        )
        .leftJoinAndSelect('messages.user', 'messageUser')
        .where('conversation.id IN ' + '(SELECT conversationId FROM conversation_members_users WHERE usersId = :loggedUserId)', {
          loggedUserId,
        })
        .getMany();
      return conversations;
    } catch (error) {
      throw new Error(`Error fetching conversations: ${error.message}`);
    }
  }

  async createMessage(text: string, conversationId: number, userId: number): Promise<number> {
    if (!text || !conversationId || !userId) throw new NotFoundException('An error occurred while creating');

    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
    });

    const user = await this.authService.findById(userId);
    const message = new Message();
    message.text = text;
    message.conversation = conversation;
    message.user = user;
    await this.messageRepository.save(message);
    return message.id
  }

  async getListMessage(loggedUserId: number, conversationId: number): Promise<any> {
    if (!loggedUserId || !conversationId) return;

    const isUserInConversation = await this.conversationRepository
      .createQueryBuilder('conversation')
      .innerJoin('conversation.members', 'members')
      .where('members.id = :userId', { userId: loggedUserId })
      .andWhere('conversation.id = :conversationId', { conversationId })
      .getCount();

    if (isUserInConversation === 0) {
      throw new NotFoundException('You do not have permission to access messages in this chat.');
    }

    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.user', 'users')
      .where('message.conversationId = :conversationId', { conversationId })
      .orderBy('message.created_at', 'DESC')
      .take(20)
      .getMany();

    return messages.reverse();
  }

  async removeMessage(loggedUserId: number, messageId: number): Promise<void> {
    const message = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.user', 'user')
      .where('user.id = :userId', { userId: loggedUserId })
      .where('message.id = :messageId', { messageId })
      .getOne();
    if (message) {
      message.isRemoved = true;
      message.text = '';
    }
    await this.messageRepository.save(message);
  }
}
