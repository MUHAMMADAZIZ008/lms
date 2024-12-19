import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { HashPassword } from 'src/utils/hashing';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'src/email/email.module';
import { otpProviders } from 'src/otp/otp.provider';

@Module({
  imports: [EmailModule, JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [...otpProviders, HashPassword, AuthService],
})
export class AuthModule {}
