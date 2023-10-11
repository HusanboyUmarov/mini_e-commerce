import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { Picture } from './models/picture.model';

@Injectable()
export class PicturesService {
  constructor(
    @InjectModel(Picture) readonly pictureRepo: typeof Picture,
    private readonly fileService: FilesService
  ){}

 async createFile(createPictureDto: CreatePictureDto, file:any){
  const fileName = await this.fileService.createFile(file)
  const newPicture = await this.pictureRepo.create(
    {
      ...createPictureDto, 
      file_name:fileName
    })

    return newPicture
 }
}
