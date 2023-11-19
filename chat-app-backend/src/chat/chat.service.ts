import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UserInfoDto } from 'src/dtos/user.dto';
import { Conversation } from 'src/entities/conversation.entity';
import { Message } from 'src/entities/message.entity';
import { Users } from 'src/entities/users.entity';
import { Repository, getConnection } from 'typeorm';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private authService: AuthService,
  ) {}

  sendMessageToWebSocket(message: string, socket: Socket) {
    socket.emit('chat', message);
  }

  async createConversation(
    loggedUser: Users,
    emails: any,
  ): Promise<UserInfoDto[]> {
    const users = await Promise.all(
      emails.map(async (emailDto) => {
        const userInfo = await this.authService.findByEmail(emailDto);
        if (!userInfo) {
          throw new NotFoundException(`User with email ${emailDto} not found.`);
        }
        return userInfo;
      }),
    );
    const conversation = new Conversation();
    conversation.members = [loggedUser, ...users];

    await this.conversationRepository.save(conversation);
    return [loggedUser, ...users];
  }

  async getListConversation(loggedUserId: number): Promise<any> {
    try {
      const conversations = await this.conversationRepository
        .createQueryBuilder('conversation')
        .leftJoinAndSelect('conversation.members', 'members')
        .leftJoinAndSelect(
          'conversation.messages',
          'messages',
          'messages.id = ' +
            '(SELECT m.id FROM message m WHERE m.conversationId = conversation.id ORDER BY m.created_at DESC LIMIT 1)',
        )
        .leftJoinAndSelect('messages.user', 'messageUser')
        .where(
          'conversation.id IN ' +
            '(SELECT conversationId FROM conversation_members_users WHERE usersId = :loggedUserId)',
          { loggedUserId },
        )
        .getMany();
      return conversations;
    } catch (error) {
      throw new Error(`Error fetching conversations: ${error.message}`);
    }
  }

  async createMessage(
    text: string,
    conversationId: number,
    userId: number,
  ): Promise<void> {
    if (!text || !conversationId || !userId)
      throw new NotFoundException('An error occurred while creating');

    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
    });

    const user = await this.authService.findById(userId);
    const message = new Message();
    message.text = text;
    message.conversation = conversation;
    message.user = user;
    await this.messageRepository.save(message);
  }

  async getListMessage(
    loggedUserId: number,
    conversationId: number,
  ): Promise<any> {
    if (!loggedUserId || !conversationId) return;

    const isUserInConversation = await this.conversationRepository
      .createQueryBuilder('conversation')
      .innerJoin('conversation.members', 'members')
      .where('members.id = :userId', { userId: loggedUserId })
      .andWhere('conversation.id = :conversationId', { conversationId })
      .getCount();

    if (isUserInConversation === 0) {
      throw new NotFoundException(
        'You do not have permission to access messages in this chat.',
      );
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
}
