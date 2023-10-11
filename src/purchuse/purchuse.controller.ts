import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PurchuseService } from './purchuse.service';
import { CreatePurchuseDto } from './dto/create-purchuse.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminSelfGuard } from '../guards/isAdmin.guard';


@ApiTags('Purchuse')
@UseGuards(AdminSelfGuard)
@Controller('purchuse')
export class PurchuseController {
  constructor(private readonly purchuseService: PurchuseService) {}
  @ApiOperation({summary:`create purcgusing`})
  @Post()
  create(@Body() createPurchuseDto: CreatePurchuseDto) {
    return this.purchuseService.create(createPurchuseDto);
  }

  @ApiOperation({summary:`return all purchesing`})
  @Get()
  findAll() {
    return this.purchuseService.findAll();
  }

  @ApiOperation({summary:'return one spesific purchesing'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchuseService.findOne(+id);
  }

}
