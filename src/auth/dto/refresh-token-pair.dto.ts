import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class RefreshTokenPairDto {
  @IsJWT()
  @ApiProperty()
  refreshToken: string;
}
