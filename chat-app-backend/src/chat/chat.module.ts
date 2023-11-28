import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Conversation } from 'src/entities/conversation.entity';
import { Message } from 'src/entities/message.entity';
import { Users } from 'src/entities/users.entity';
import { AuthModule } from '../auth/auth.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AppGateway } from 'src/websockets/chat.gateway';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Conversation, Users, Message])],
  controllers: [ChatController],
  providers: [ChatService, AuthService, JwtService, ConfigService, AppGateway],
})
export class ChatModule {}
