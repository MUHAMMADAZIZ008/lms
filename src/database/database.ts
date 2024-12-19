import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Otp } from 'src/otp/otp';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get<string>('PG_HOST'),
        port: +configService.get<string>('PG_PORT'),
        username: configService.get<string>('PG_USER'),
        password: configService.get<string>('PG_PASSWORD'),
        database: configService.get<string>('PG_DATABASE'),
      });
      sequelize.addModels([User, Otp]);
      await sequelize.sync({
        force: false,
      });

      return sequelize;
    },
  },
];
