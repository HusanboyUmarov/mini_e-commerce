import { Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Picture } from './models/picture.model';
import { FilesModule } from '../files/files.module';

@Module({
  imports:[SequelizeModule.forFeature([Picture]), FilesModule],
  controllers: [PicturesController],
  providers: [PicturesService],
})
export class PicturesModule {}
