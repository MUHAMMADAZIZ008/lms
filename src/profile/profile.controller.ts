import {
  Controller,
  Get,
  Body,
  Delete,
  UseGuards,
  Request,
  Put,
  Patch,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Post,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { IPayload, IPassword } from 'src/common/user.interface';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get('me')
  getMe(@Request() req: any) {
    const user: IPayload = req.user;
    return this.profileService.getMe(user);
  }

  @Put('update')
  updateProfile(
    @Request() req: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const user: IPayload = req.user;
    return this.profileService.updateProfile(user, updateProfileDto);
  }

  @Delete('delete')
  deleteProfile(@Request() req: any) {
    const user: IPayload = req.user;
    return this.profileService.deleteProfile(user);
  }
  @Patch('update-password')
  updatePassword(@Request() req: any, @Body() usersPasswords: IPassword) {
    const user: IPayload = req.user;
    return this.profileService.updatePassword(user, usersPasswords);
  }

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './user-avatar',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileNewName = `${file.fieldname}-${uniqueSuffix}.${file.originalname.split('.').pop()}`;
          callback(null, fileNewName);
        },
      }),
    }),
  )
  avatarUpload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: /(image\/jpeg|image\/png)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Request() req: any,
  ) {
    const user: IPayload = req.user;
    return this.profileService.avatarUpload(user, file);
  }
}
