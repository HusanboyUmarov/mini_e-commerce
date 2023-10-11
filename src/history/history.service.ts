import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './models/history.model';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History) readonly historyRepo: typeof History
  ){}
  create(createHistoryDto: CreateHistoryDto) {
    return this.historyRepo.create(createHistoryDto);
  }

  findAll() {
    return this.historyRepo.findAll();
  }

  findOne(id: number) {
    return this.historyRepo.findOne({where:{id}});
  }
}
