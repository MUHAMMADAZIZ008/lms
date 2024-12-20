import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repository/category.repositoy';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepositoriy: CategoryRepository) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepositoriy.create(createCategoryDto);
  }

  findAll(page: number, limit: number) {
    return this.categoryRepositoriy.findAll(page, limit);
  }

  findOne(id: number) {
    return this.categoryRepositoriy.findOne(id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepositoriy.update(id , updateCategoryDto);
  }

  remove(id: number) {
    return this.categoryRepositoriy.remove(id);
  }
}
