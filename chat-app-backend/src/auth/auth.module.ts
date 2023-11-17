import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { Users } from '../entities/users.entity'; // Import User entity
import { JwtMiddleware } from './jwt.middleware';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Kun123456@!',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Users]), // Register User repository
  ],
  providers: [AuthService, JwtService, ConfigService, JwtMiddleware],
  controllers: [AuthController],
  exports: [JwtMiddleware],
})
export class AuthModule {}
