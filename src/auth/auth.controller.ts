import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

import { JwtTokensDto } from './dto/jwt-tokens.dto';
import { RefreshTokenPairDto } from './dto/refresh-token-pair.dto';
import { SignUpDto } from './dto/sign-up.dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @ApiOkResponse({ type: JwtTokensDto })
  @HttpCode(200)
  @Post('/sign-in')
  signIn (@Body() { email, password }: SignInDto) {
    return this.authService.signIn(email, password);
  }

  @ApiOkResponse({ type: JwtTokensDto })
  @HttpCode(200)
  @Post('/refresh')
  refresh (@Body() { refreshToken }: RefreshTokenPairDto) {
    return this.authService.refreshTokenPair(refreshToken);
  }

  @ApiCreatedResponse({ type: JwtTokensDto })
  @Post('/sign-up')
  signUp (@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }
}
