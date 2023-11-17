import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { Conversation } from './entities/conversation.entity';
import { Users } from './entities/users.entity';
import { Message } from './entities/message.entity';
import { AppGateway } from './websockets/chat.gateway';

@Module({
  imports: [
    ChatModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Kun123456@!',
      database: 'chat_app',
      entities: [Users, Conversation, Message],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
