import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminSelfGuard } from '../guards/isAdmin.guard';
@ApiTags('history')

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  @ApiOperation({summary:'create history'})
  @UseGuards(AdminSelfGuard)
  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }
  @ApiOperation({summary:'get all history'})
  @UseGuards(AdminSelfGuard)
  @Get()
  findAll() {
    return this.historyService.findAll();
  }
  @ApiOperation({summary:'get one history'})
  @UseGuards(AdminSelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(+id);
  }

}
