import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/dtos/user.dto';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async findById(id: number): Promise<Users | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.createQueryBuilder('users').addSelect('users.password').where('users.email = :email', { email }).getOne();
  }

  async login(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new NotFoundException(`User with email ${email} not found.`);
    const passwordMatched = await bcrypt.compare(password, user?.password);

    if (!passwordMatched) throw new UnauthorizedException('The password is incorrect. Try again.');
    const token = await this.createToken(user);
    return { access_token: token };
  }

  async createToken(user: Users): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    const secret = this.configService.get<string>('JWT_SECRET');
    return this.jwtService.sign(payload, { secret });
  }

  async create(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const isExistEmail = await this.findByEmail(createUserDto.email);
    if (isExistEmail) throw new ConflictException('Email already exists in the system.');

    const user = new Users();
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.usersRepository.save(user);
    const access_token = await this.createToken(newUser);
    return { access_token };
  }
}
