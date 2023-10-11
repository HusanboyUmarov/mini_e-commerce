import { Injectable,BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import {Response} from 'express'
import * as bcrypt from 'bcrypt'
import { LoginAdminDto } from './dto/login-admin.Dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
     @InjectModel(Admin)  readonly adminRepo:typeof Admin,
     readonly jwtService:JwtService
  ){}
  async create(createAdminDto: CreateAdminDto) {
    const admin = await this.adminRepo.findOne({where:{email: createAdminDto.email}})
    if(admin) throw new BadRequestException({message : 'email already has used by other admin'})
    return this.adminRepo.create(createAdminDto);
  }

  findAll() {
    return this.adminRepo.findAll();
  }

  findOne(id: number) {
    return this.adminRepo.findOne({where:{id}});
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const date = await this.adminRepo.update(updateAdminDto, 
      {
        where:{
          id
        },
        returning:true
      });

      return date[1][0]
  }

  async remove(id: number) {
    const data = await this.adminRepo.destroy({
      where:{id}
    });
    return {
      message: 'success', 
      admin: data
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
async loginAdmin(loginAdminDto:LoginAdminDto, res:Response){
  const {email, password} = loginAdminDto
  const admin = await this.adminRepo.findOne({where:{email}})

  if(!admin)
  throw new UnauthorizedException({message: 'admin does not exsist'})
  if(admin.password != password)
  throw new UnauthorizedException({message:'email or password is not currect'})

  const tokens = await this.getToken(admin)
  res.cookie('refresh_token', {
    maxAge:1000*60*60*24*15,
    httpOnly:true,
    refresh_token: tokens.refreshToken,
  })
  
  const response = {
    message: 'user has logged Successfully',
    tokens
  }

  return response
}

//-------------------------------------------------------------------------------------------------------//
  async getToken(admin:Admin){
    const jwtPayload = {
      id: admin.id, 
      is_creator:admin.is_creator
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret:process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
        
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY, 
        expiresIn:process.env.REFRESH_TOKEN_TIME
      })
    ])
   return {
    refreshToken,
    accessToken}
  }

};

