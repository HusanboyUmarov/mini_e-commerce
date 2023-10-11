import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

import {Response} from 'express'
import { LoginClientDto } from './dto/loginClientDto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminSelfGuard } from '../guards/isAdmin.guard';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('Client')
// @UseGuards(AdminSelfGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
//-------------------------------------------------------------------------------------------------------//
  @ApiOperation({summary:'logout from site'})
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken:string,
    @Res({passthrough:true}) res:Response
  ){
    return this.clientService.logout(refreshToken, res) 
   }
//-------------------------------------------------------------------------------------------------------//
@ApiOperation({summary:'activating client'})
  @Get('activate/:link')
  async activateClient(@Param('link') link: string){
    return this.clientService.activating(link)
  }

//-------------------------------------------------------------------------------------------------------//
@ApiOperation({summary:'create clieant'})
  @Post('create')
  create(
    @Body() createClientDto: CreateClientDto,
    @Res({passthrough:true}) res:Response) {
    return this.clientService.registrationUser(createClientDto, res);
  }
  //-------------------------------------------------------------------------------------------------------//
  @ApiOperation({summary:'login in site by client side'})
  @Post('login')
  login(
    @Body() loginClientDto: LoginClientDto,
    @Res({passthrough:true}) res:Response) {
    return this.clientService.loginClient(loginClientDto, res)
  }
//-------------------------------------------------------------------------------------------------------//
@ApiOperation({summary:'get all clients'})
@Delete('/:id')
del(
  @Param('id') id:string) {
    console.log(id)
  return this.clientService.remove(id);
}

@Patch('/:id')
rename(
  @Body() updateClientDto:UpdateClientDto,
  @Param('id') id:string) {
  return this.clientService.update(updateClientDto,id);
}
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get('/:id')
  getOne(
    @Param('id') id:string) {
    return this.clientService.getOne(id);
  }

  @ApiOperation({summary:'refresh token'})
  @Post('refresh/:id')
 async refreshToken(
  @Param('id') id:string,
  @CookieGetter('refresh_token') refresh_token:string,
  @Res({passthrough:true})  res:Response
 ){
 return  this.clientService.refreshToken(+id, refresh_token, res)
 }

}
