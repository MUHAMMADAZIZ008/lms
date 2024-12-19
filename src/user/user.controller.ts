import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage, memoryStorage } from 'multer';
import { ImageKitService } from 'imagekit-nestjs';

@Controller('user')
export class UserController {
  constructor(
    private readonly imageKitService: ImageKitService,
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('profile')
  // @UseInterceptors(
  //   FileInterceptor('avatar', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: function (req, file, cb) {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         console.log(file);
  //         cb(
  //           null,
  //           file.fieldname +
  //             '-' +
  //             uniqueSuffix +
  //             '.' +
  //             file.originalname.split('.')[1],
  //         );
  //       },
  //     }),
  //   }),
  // )
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage(),
    }),
  )
  async uploadFile(@UploadedFile() file) {
    console.log(file);

    const fileBase64 = file.buffer.toString('base64');

    const result = await this.imageKitService.upload({
      file: fileBase64,
      fileName: file.originalname,
    });
    console.log(result);

    return result.url;
  }
}
