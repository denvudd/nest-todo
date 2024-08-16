import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from './entities/user.entity';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async create(signUpDto: SignUpDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOneBy({
      email: signUpDto.email,
    });

    if (existingUser) throw new BadRequestException('User already exists');

    const userEntity = this.userRepository.create(signUpDto);

    const password = await bcrypt.hash(
      signUpDto.password,
      this.configService.bcryptSalt,
    );

    return this.userRepository.save({ ...userEntity, password });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findOneById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }
}
