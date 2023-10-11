import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePurchuseDto } from './dto/create-purchuse.dto';
import { UpdatePurchuseDto } from './dto/update-purchuse.dto';
import { Purchuse } from './models/purchuse.model';

@Injectable()
export class PurchuseService {

  constructor(
    @InjectModel(Purchuse) readonly purchuseRepo: typeof Purchuse
  ){}

  create(createPurchuseDto: CreatePurchuseDto) {
    return this.purchuseRepo.create(createPurchuseDto);
  }

  findAll() {
    return this.purchuseRepo.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.purchuseRepo.findOne({where:{id}, include:{all:true}});
  }


}
