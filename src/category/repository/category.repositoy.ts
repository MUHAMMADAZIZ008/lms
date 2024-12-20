import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryModel: typeof Category,
  ) {}

  async create(createCateroyDto) {
    return this.categoryModel.create(createCateroyDto);
  }

  async findAll(page:number, limit:number) {
    const offsate = (page - 1) * limit;
    return this.categoryModel.findAll({ offset: offsate, limit: limit });
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findOne({ where: { id } });
    if (!category) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    return { status: HttpStatus.OK, data: category };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findOne({ where: { id } });
    if (!category) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    await this.categoryModel.update(UpdateCategoryDto, {where:{id}})
    return { status: HttpStatus.OK, id };
  }

  async remove(id:number){
    const category = await this.categoryModel.findOne({ where: { id } });
    if (!category) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    await this.categoryModel.destroy({where:{id}})
    return { status: HttpStatus.OK, id };
  }
}
