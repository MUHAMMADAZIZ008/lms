import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { groupRepository } from './repository/group.repositoy';

@Injectable()
export class GroupService {
  constructor(private groupRepository: groupRepository) {}
  create(createGroupDto: CreateGroupDto) {
    return this.groupRepository.create(createGroupDto);
  }

  findAll(page: number, limit: number) {
    return this.groupRepository.findAll(page, limit);
  }

  findOne(id: number) {
    return this.groupRepository.findOne(id);
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.groupRepository.update(id, updateGroupDto);
  }

  remove(id: number) {
    return this.groupRepository.remove(id);
  }
}
