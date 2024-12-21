import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { CreateProfileDto } from './dto/create-profile.dto';
// import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from 'src/user/entities/user.entity';
import { IPassword, IPayload } from 'src/common/user.interface';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { HashPassword } from 'src/utils/hashing';

@Injectable()
export class ProfileService {
  constructor(
    private readonly userReposity: UserRepository,
    private readonly hashPassword: HashPassword,
  ) {}
  async getMe(user: IPayload): Promise<User> {
    const currentUser = await this.userReposity.findOne(user.sub);
    if (!currentUser) {
      throw new NotFoundException('user not found');
    }
    return currentUser;
  }

  async updateProfile(
    user: IPayload,
    updateProfileDto: UpdateProfileDto,
  ): Promise<any> {
    const currentUser = await this.userReposity.findOne(user.sub);
    if (!currentUser) {
      throw new NotFoundException('user not found');
    }
    // if (updateProfileDto.password) {
    //   const hashedPassword = await this.hashPassword.createHashPassword(
    //     updateProfileDto.password,
    //   );
    //   updateProfileDto.password = hashedPassword;
    // }
    const updatedUser = await this.userReposity.update(
      currentUser.id,
      updateProfileDto,
    );
    return updatedUser;
  }

  async deleteProfile(user: IPayload): Promise<any> {
    const currentUser = await this.userReposity.findOne(user.sub);
    if (!currentUser) {
      throw new NotFoundException('user not found');
    }
    const deleteUser = await this.userReposity.remove(currentUser.id);
    return deleteUser;
  }

  async updatePassword(
    user: IPayload,
    usersPasswords: IPassword,
  ): Promise<string> {
    const currentUser = await this.userReposity.findOne(user.sub);
    if (!currentUser) {
      throw new NotFoundException('user not found');
    }
    const isMatch = await this.hashPassword.comparePassword(
      usersPasswords.oldPassword,
      currentUser.password,
    );
    if (!isMatch) {
      throw new BadRequestException('invalit password');
    }
    await this.userReposity.update(currentUser.id, {
      password: usersPasswords.newPassword,
    });
    return 'your password have been changed';
  }

  async avatarUpload(user: IPayload, file: Express.Multer.File) {
    const currentUser = await this.userReposity.findOne(user.sub);

    if (!currentUser) {
      throw new NotFoundException('user not found');
    }
    await this.userReposity.uploadPicture(currentUser.id, file);
    return 'picture has been saved';
  }
}
