import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminSelfGuard } from '../guards/isAdmin.guard';
@ApiTags('Uploading pictures')
@UseGuards(AdminSelfGuard)
@Controller('picture')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}
  @ApiOperation({summary:'create photo'})
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async creteFile(
    @Body() createPictureDto:CreatePictureDto,
    @UploadedFile() file:any
  ){
    return this.picturesService.createFile(createPictureDto,file)
  }

}
