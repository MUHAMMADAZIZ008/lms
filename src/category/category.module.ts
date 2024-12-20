import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './repository/category.repositoy';
import { CategoryProviders} from './category.providers';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService,...CategoryProviders, CategoryRepository],
  exports:[CategoryRepository]
})
export class CategoryModule {}
