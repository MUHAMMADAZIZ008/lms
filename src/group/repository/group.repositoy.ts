import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Group } from '../entities/group.entity';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';

@Injectable()
export class groupRepository {
  constructor(
    @Inject('GROUP_REPOSITORY')
    private groupModel: typeof Group,
  ) {}

  async create(CreateGroupDto) {
    return this.groupModel.create(CreateGroupDto);
  }

  async findAll(page: number, limit: number) {
    const offsate = (page - 1) * limit;
    return this.groupModel.findAll({ offset: offsate, limit: limit });
  }

  async findOne(id: number) {
    const group = await this.groupModel.findOne({ where: { id } });
    if (!group) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    return { status: HttpStatus.OK, data: group };
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupModel.findOne({ where: { id } });
    if (!group) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    await this.groupModel.update(updateGroupDto, { where: { id } });
    return { status: HttpStatus.OK, id };
  }

  async remove(id: number) {
    const group = await this.groupModel.findOne({ where: { id } });
    if (!group) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    await this.groupModel.destroy({ where: { id } });
    return { status: HttpStatus.OK, id };
  }
}
