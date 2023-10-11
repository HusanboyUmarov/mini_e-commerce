import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClientModule } from '../client/client.module';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product) readonly productRepo: typeof Product
  ){}
  async create(createProductDto: CreateProductDto) {
    const data = await this.productRepo.findOne(
      {
        where:{
          name: createProductDto.name,
          cost:createProductDto.cost,
          category_id:createProductDto.category_id,
          description:createProductDto.description
        }
      });
      if(data){
        const updateCount = data.count+ createProductDto.count
       const fulldata = await this.productRepo.update({count:updateCount},{where:{name:createProductDto.name}, returning:true})
       console.log(fulldata)
       return fulldata[1][0]
      }
      return this.productRepo.create(createProductDto)


  }

  findAll() {
    return this.productRepo.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.productRepo.findOne({where:{id}, include:{all:true}});
  }
  async update(id: number, updateProductDto: UpdateProductDto) {
     const data = await this.productRepo.update(updateProductDto, {where:{id}, returning:true});
     return data[1][0]
  }

  remove(id: number) {
    return this.productRepo.destroy({where:{id}});
  }
}
