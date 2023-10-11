import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatorSelfGuard } from '../guards/isCreator.guard';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.Dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {Response} from 'express'
import { AdminSelfGuard } from '../guards/isAdmin.guard';
import { SelfIdGuard } from '../guards/selfById.guard';
@ApiTags('Admin')
// @UseGuards(CreatorSelfGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  login(@Body() loginAdminDto:LoginAdminDto,@Res({passthrough:true}) res:Response){
    return this.adminService.loginAdmin(loginAdminDto, res)
  }
  @UseGuards(CreatorSelfGuard)
  @Post('create')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(CreatorSelfGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  
  @UseGuards(SelfIdGuard)
  @UseGuards(AdminSelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(SelfIdGuard)
  @UseGuards(AdminSelfGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }
  @UseGuards(SelfIdGuard)
  @UseGuards(AdminSelfGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
