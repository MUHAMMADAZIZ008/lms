import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Course } from 'src/course/entities/course.entity';
import { Group } from 'src/group/entities/group.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'saman77071!', 
        database: 'lms', 
      });
      sequelize.addModels([User, Category, Course , Group]);
      await sequelize.sync({
        force: true,
      });

      return sequelize;
    },
  },
];
