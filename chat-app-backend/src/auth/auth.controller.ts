import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
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

  @UseGuards(AuthGuard('jwt'))
  @Get('listUser')
  async getListUser(@Request() req) {
    return await this.authService.getListUser(req.user.id);
  }

  @Post('create-user')
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          const emailError = errors.find((error) => error.property === 'email');
          throw new BadRequestException(emailError ? emailError.constraints.isEmail : errors);
        },
      }),
    )
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
