import { Module } from '@nestjs/common';
import { PurchuseService } from './purchuse.service';
import { PurchuseController } from './purchuse.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Purchuse } from './models/purchuse.model';

@Module({
  imports:[SequelizeModule.forFeature([Purchuse])],
  controllers: [PurchuseController],
  providers: [PurchuseService],
})

export class PurchuseModule {}
