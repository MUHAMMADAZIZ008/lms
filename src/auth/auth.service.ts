import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpAuthDto } from './dto/signup-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { HashPassword } from 'src/utils/hashing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Otp } from 'src/otp/otp';
import { EmailService } from 'src/email/email.service';
import { UserStatus } from 'src/common/enums/user.status';
import { OtpDto } from 'src/otp/otp.dto';
import { Itoken } from 'src/common/token.interface';
import {
  IforgetPassword,
  IRestorationPassword,
} from 'src/common/forget.interface';
import { otpType } from 'src/common/enums/otp.enum';

function generateAlphanumericOTP(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += characters[Math.floor(Math.random() * characters.length)];
  }
  return otp;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('OTP_PROVIDER') private readonly otpModel: typeof Otp,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly userReposity: UserRepository,
    private readonly hashPassword: HashPassword,
    private jwtService: JwtService,
  ) {}

  async create(signUpAuthDto: SignUpAuthDto) {
    const otp = generateAlphanumericOTP(8);
    const newUser = await this.userReposity.create(signUpAuthDto);

    await this.emailService.sendActivedOtp(
      signUpAuthDto.email,
      'otp',
      otp,
      newUser.id,
    );

    await this.otpModel.create({
      user_id: newUser.id,
      otp_code: otp,
      type: otpType.activeOtp,
    });
    return 'otp and id have been sent your email';
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
      sub: +currentUser.id,
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

  async activeOtp(otp: OtpDto) {
    const curretOtp = await this.otpModel.findOne({
      where: { user_id: otp.user_id },
    });
    if (!curretOtp) {
      throw new UnauthorizedException('invalid otp');
    }
    const now = new Date();
    if (now > curretOtp.expires_at) {
      throw new UnauthorizedException('invalid otp');
    }
    if (otp.otp_code !== curretOtp.otp_code) {
      throw new UnauthorizedException('invalid otp');
    }

    if (curretOtp.type !== otpType.activeOtp) {
      throw new UnauthorizedException('invalid otp');
    }
    await this.otpModel.destroy({
      where: { id: curretOtp.id },
    });
    await this.userReposity.update(otp.user_id, {
      status: UserStatus.active,
    });
    return 'you have been active';
  }

  async refreshToken(token: Itoken) {
    try {
      const decode = await this.jwtService.verify(token.refresh_token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const payload = {
        sub: decode.sub,
        username: decode.username,
        role: decode.role,
      };

      const accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
      });
      const refreshToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      });
      console.log({
        accessToken,
        refreshToken,
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async forgerEmail(forgetPassword: IforgetPassword) {
    const currentUser = await this.userReposity.getEmail(forgetPassword.email);
    if (!currentUser) {
      throw new NotFoundException('user not found');
    }
    const otp = generateAlphanumericOTP(8);
    await this.emailService.sendActivedOtp(
      currentUser.email,
      'otp',
      otp,
      currentUser.id,
    );

    await this.otpModel.create({
      user_id: currentUser.id,
      otp_code: otp,
      type: otpType.forgetOtp,
    });
    return 'otp and id have been sent your email';
  }
  async restorationPassword(changePassword: IRestorationPassword) {
    const curretOtp = await this.otpModel.findOne({
      where: { user_id: changePassword.userId },
    });
    if (!curretOtp) {
      throw new UnauthorizedException('invalid otp');
    }
    if (curretOtp.type !== otpType.forgetOtp) {
      throw new UnauthorizedException('invalid otp');
    }
    if (changePassword.otp !== curretOtp.otp_code) {
      throw new UnauthorizedException('invalid otp');
    }
    await this.userReposity.update(changePassword.userId, {
      password: changePassword.newPassword,
    });
    return 'your password have been changed';
  }
}
