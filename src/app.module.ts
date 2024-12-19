import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { ImageKitModule } from 'imagekit-nestjs';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ImageKitConfig } from './configs/imagekit.config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import {  AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/role.guard';
import { CategoryModule } from './category/category.module';
import { CourseModule } from './course/course.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
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
    ConfigModule.forRoot({
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
  providers:[
    {
      provide:APP_GUARD,
      useClass:AuthGuard
    },
    {
      provide:APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
