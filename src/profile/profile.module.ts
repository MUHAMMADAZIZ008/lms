import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserModule } from 'src/user/user.module';
import { GruardModule } from 'src/guard/guard.module';
import { JwtModule } from '@nestjs/jwt';
import { HashPassword } from 'src/utils/hashing';

@Module({
  imports: [JwtModule.register({}), UserModule, GruardModule],
  controllers: [ProfileController],
  providers: [HashPassword, ProfileService],
})
export class ProfileModule {}
