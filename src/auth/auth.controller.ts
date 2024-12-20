import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { OtpDto } from 'src/otp/otp.dto';
import { Itoken } from 'src/common/token.interface';
import { IforgetPassword } from 'src/common/forget.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  register(@Body() createAuthDto: SignUpAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('signin')
  login(@Body() createAuthDto: SignUpAuthDto) {
    return this.authService.login(createAuthDto);
  }
  @Post('active/otp')
  actioveOtp(@Body() otp: OtpDto) {
    return this.authService.avtiveOtp(otp);
  }
  @Post('refresh/token')
  refreshToken(@Body() token: Itoken) {
    return this.authService.refreshToken(token);
  }
  @Post('forget-password')
  forgetPassword(@Body() forgetPassword: IforgetPassword) {
    return this.authService.forgerPassword(forgetPassword);
  }
}
