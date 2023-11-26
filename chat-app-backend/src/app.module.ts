import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { PrefixInterceptor } from './common/prefix.interceptor';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { Users } from './entities/users.entity';

@Module({
  imports: [
    ChatModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: configService.get<string>('DB_PASSWORD'),
        database: 'chat_app',
        entities: [Users, Conversation, Message],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PrefixInterceptor,
    },
  ],
})
export class AppModule {}
