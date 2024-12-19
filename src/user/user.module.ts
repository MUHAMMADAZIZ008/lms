import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './ user.providers';
import { MulterModule } from '@nestjs/platform-express';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    // MulterModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     dest: configService.get<string>('MULTER_DEST'),
    //   }),
    //   inject: [ConfigService],
    // }),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, ...userProviders, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
