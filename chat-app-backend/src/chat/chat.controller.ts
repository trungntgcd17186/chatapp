import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConversationDto } from 'src/dtos/chat.dto';
import { EmailsDto } from 'src/dtos/user.dto';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('list-conversation')
  async getListConversation(@Request() req: { user: { id: number } }) {
    const loggedUserId = req.user.id;
    return await this.chatService.getListConversation(loggedUserId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create-conversation')
  async createConversation(
    @Request() req: { user },
    @Body(new ValidationPipe()) emailsDto: EmailsDto,
  ) {
    return await this.chatService.createConversation(
      req.user,
      emailsDto.emails,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('list-message')
  async getListMessage(@Request() req, @Body() body: ConversationDto) {
    return await this.chatService.getListMessage(
      req.user.id,
      body.conversation_id,
    );
  }
}
