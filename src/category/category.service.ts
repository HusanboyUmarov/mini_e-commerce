import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { toUSVString } from 'util';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)  readonly CategoryRepo:typeof Category
  ){}
  
  async create(createCategoryDto: CreateCategoryDto) {
    const data = await this.CategoryRepo.findOne({where:{name:createCategoryDto.name}})
    console.log(data)
    if(data) throw new BadRequestException({message: `category already exsist`})
    return this.CategoryRepo.create(createCategoryDto);
  }

  findAll() {
    return this.CategoryRepo.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.CategoryRepo.findOne({where:{id}, include:{all:true}});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const data = await this.CategoryRepo.update(updateCategoryDto, {where:{id}, returning:true});
    return data[1][0]
  }

  remove(id: number) {
    return this.CategoryRepo.destroy({where:{id}});
  }
}
