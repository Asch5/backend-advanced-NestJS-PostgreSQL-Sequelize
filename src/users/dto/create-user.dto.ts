import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'email' })
  @IsString({ message: 'Mast be a string' })
  @IsEmail({}, { message: 'Email is incorrect' })
  readonly email: string;
  @ApiProperty({ example: 'jd5jsl9fkw', description: 'password' })
  @IsString({ message: 'Mast be a string' })
  @Length(4, 16, { message: 'not less than 4 and not more than 16' })
  readonly password: string;
}
