import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsJWT } from 'class-validator';

export class JwtTokensDto {
  @IsJWT()
  @ApiProperty()
  @Expose()
  accessToken: string;

  @IsJWT()
  @ApiProperty()
  @Expose()
  refreshToken: string;
}
