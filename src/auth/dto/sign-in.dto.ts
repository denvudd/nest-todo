import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    default: 'customer@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: 'customerPassword',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
