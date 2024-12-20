import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './repository/category.repositoy';
import { CategoryProviders } from './category.providers';
import { GruardModule } from 'src/guard/guard.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), GruardModule],
  controllers: [CategoryController],
  providers: [CategoryService, ...CategoryProviders, CategoryRepository],
  exports: [CategoryRepository],
})
export class CategoryModule {}
