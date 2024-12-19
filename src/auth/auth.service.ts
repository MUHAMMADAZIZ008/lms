import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { HashPassword } from 'src/utils/hashing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userReposity: UserRepository,
    private readonly hashPassword: HashPassword,
    private jwtService: JwtService,
  ) {}

  async create(signUpAuthDto: SignUpAuthDto) {
    return this.userReposity.create(signUpAuthDto);
  }

  async login(signInAuthDto: SignInAuthDto) {
    const currentUser = await this.userReposity.userLogin(signInAuthDto);
    if (!currentUser) {
      throw new ForbiddenException('username or password is wrong');
    }
    const isMatch = await this.hashPassword.comparePassword(
      signInAuthDto.password,
      currentUser.password,
    );
    if (!isMatch) {
      throw new ForbiddenException('username or password is wrong');
    }
    const payload = {
      sub: currentUser.id,
      username: currentUser.username,
      role: currentUser.role,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return this.userReposity.findOne(id);
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.userReposity.update(id, updateAuthDto);
  }

  remove(id: number) {
    return this.userReposity.remove(id);
  }
}
