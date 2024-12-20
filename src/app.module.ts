import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ImageKitModule } from 'imagekit-nestjs';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ImageKitConfig } from './configs/imagekit.config';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/role.guard';
import { GroupModule } from './group/group.module';
import { CourseModule } from './course/course.module';
import { CategoryModule } from './category/category.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get<string>('SMTP_USER'),
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/files',
    }),
    ImageKitModule.forRootAsync({
      useFactory: ImageKitConfig,
      inject: [ConfigService],
      imports: [ConfigModule],
      isGlobal: true,
    }),
    JwtModule.register({}),
    DatabaseModule,
    UserModule,
    AuthModule,
    CategoryModule,
    CourseModule,
    GroupModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
