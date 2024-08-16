import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { JwtUserInfo } from 'src/common/types/jwt-user-info.interface';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtTokensDto } from './dto/jwt-tokens.dto';

@Injectable()
export class AuthService {
  private readonly jwtExpiresIn: string = '1h';
  private readonly jwtRefreshExpiresIn: string = '7d';

  constructor (
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private generateTokenPair ({ id, email, isAdmin }: JwtUserInfo) {
    const payload = { id, email, isAdmin };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: this.jwtExpiresIn,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: this.jwtRefreshExpiresIn,
      }),
    };
  }

  async signIn (email: string, pass: string): Promise<JwtTokensDto> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokenPair(user);
  }

  async signUp (dto: SignUpDto) {
    const newUser = await this.userService.create(dto);

    return this.generateTokenPair(newUser);
  }

  async refreshTokenPair (refreshToken: string) {
    const { id }: JwtUserInfo = await this.jwtService.decode(refreshToken);
    const userEntity = await this.userService.findOneById(id);

    return this.generateTokenPair(userEntity);
  }
}
