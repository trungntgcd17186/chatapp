import { ArrayMinSize, ArrayUnique, IsArray, IsEmail } from 'class-validator';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export class UserInfoDto {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export class EmailsDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'At least two emails are required' })
  @ArrayUnique(undefined, { message: "All emails's elements must be unique" })
  @IsEmail({}, { each: true, message: 'Email is not valid' })
  emails: string[];
}

export class LoginDto {
  username: string;
  password: string;
}
