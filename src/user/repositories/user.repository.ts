import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private userModel: typeof User,
  ) {}

  async create(createUserDto) {
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll<User>();
  }

  async findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, {
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return this.userModel.destroy({
      where: {
        id,
      },
    });
  }
}
