import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres', //sizning username
        password: 'postgres', // sizning passwortiz
        database: 'postgres', //sizning database
      });
      sequelize.addModels([User]);
      await sequelize.sync({
        force: true,
      });

      return sequelize;
    },
  },
];
