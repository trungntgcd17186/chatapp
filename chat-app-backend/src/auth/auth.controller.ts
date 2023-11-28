import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto, LoginDto } from '../dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getUserInfo(@Request() req: { user: { id: number } }) {
    return this.authService.findById(req.user.id);
  }

  @Post('create-user')
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
