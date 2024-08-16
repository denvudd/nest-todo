import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    default: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    default: 'Smith',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

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
