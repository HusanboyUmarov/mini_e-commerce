import { Injectable, UnauthorizedException , ForbiddenException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectModel } from '@nestjs/sequelize';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './model/client.model';
import {Response}from 'express'
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import { MailService } from '../mail/mail.service';
import { LoginClientDto } from './dto/loginClientDto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client) private readonly  clientRepo: typeof Client,
    private readonly jwtService:JwtService,
    private readonly mailService: MailService
  ){}
//-------------------------------------------------------------------------------------------------------//

async refreshToken(user_id : number, refreshToken: string, res:Response)
{
  const decodedToken = this.jwtService.decode(refreshToken)
  if(decodedToken['id'] !== user_id)
  throw new BadRequestException({message:'client not found'})

  const client = await this.clientRepo.findOne({where:{id:+user_id}})

  if(!client || !client.hashed_refresh_token)
  throw new BadRequestException({message:'client does not found'})

  const tokenMach = await bcrypt.compare(
    refreshToken, 
    client.hashed_refresh_token
  )

  if(!tokenMach)
  throw new BadRequestException({message: 'Forbinned'})
  const tokens = await this.getToken(client)

  const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7)

  const updateClient = await this.clientRepo.update(
    {hashed_refresh_token},
    {where:{id:client.id}, returning:true})
    
    res.cookie('refresh_token', tokens.refreshToken,{
      maxAge:15*24*3600*1000,
      httpOnly:true
    })
    
    const response = {
      message: 'client refreshed', 
      client: updateClient[1][0],
      tokens
    }
    return response
    
}
//-------------------------------------------------------------------------------------------------------//

async logout(refreshToken:string, res: Response){
  const clientDate = await this.jwtService.verify(refreshToken, {
    secret: process.env.REFRESH_TOKEN_KEY
  });

  if(!clientDate)
  throw new ForbiddenException('User not found') 

  const updateClient = await this.clientRepo.update(
    {hashed_refresh_token:null},
    {where:{id: clientDate.id}, returning:true}
  )
  res.clearCookie('refresh_token')
  const response = {
    message:'user logged out successfully', 
    user: updateClient[1][0]
  }
  return response 
}
//-------------------------------------------------------------------------------------------------------//
async loginClient(loginClientDto:LoginClientDto, res:Response){
  const {email, password } = loginClientDto
  const client = await this.clientRepo.findOne({
    where:{email}
  })

  if(!client)
  throw new UnauthorizedException({message: 'client does not exsist'})

  if(!client.is_active)
  throw new UnauthorizedException({message:'user is not active'})

  const checkingPassword = await bcrypt.compare(password, client.password)
  console.log(checkingPassword)
  if(!checkingPassword)
  { throw new UnauthorizedException({message:'email or password is not currect'})}
 

  const tokens = await this.getToken(client)

  const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken,7)

  let result = await this.clientRepo.update(
    {hashed_refresh_token},
    {where:{email}, 
    returning:true},
  )
  console.log(1)
  res.cookie('refresh_token', {
    maxAge:1000*60*60*24*15,
    httpOnly:true,
    refresh_token: tokens.refreshToken
  })
  
  const response = {
    message: 'user has logged Successfully',
    client: result,
    tokens
  }

  return response
}
//-------------------------------------------------------------------------------------------------------//
async activating(link:string){
  if(!link)
    throw new BadRequestException('Activating link does not found')
    const updateclient = await this.clientRepo.update({
      is_active:true
    }, 
    {
      where:{activation_link:link, is_active:false},
      returning:true
    })

    if(!updateclient)
    throw new BadRequestException('user already activated')


    const response = {
      message: 'Successfuly activated', 
      client:updateclient
    }

    return response
  
}
//-------------------------------------------------------------------------------------------------------//
async registrationUser(creatClientDto:CreateClientDto, res:Response){
  const client = await this.clientRepo.findOne({where:
    {email:creatClientDto.email}})
  if(client) 
  throw new BadRequestException({message: `user already exsist`})

  if(creatClientDto.confirm_password !== creatClientDto.password)
  throw new BadRequestException({message :`confirm password is not equal password`})

  const hashed_password = await bcrypt.hash(creatClientDto.password, 7)
  const newUser =await this.clientRepo.create({
    ...creatClientDto, 
    password:hashed_password,
  })

  const tokens =await this.getToken(newUser)
  const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7)

  const uniqueKey = uuid.v4()

  const updatedClient = await this.clientRepo.update({
    hashed_refresh_token:hashed_refresh_token,
    activation_link:uniqueKey
  }, 
  {
    where:{id:newUser.id},
    returning:true
  },)
  res.cookie(`refresh_token`, {
    id:newUser.id,
    maxAge:1000*60*60*24*15,
    httpOnly:true,
    refresh_token: tokens.refreshToken
  })

  try {
    await this.mailService.sendClinerConfirmation(updatedClient[1][0])

  } catch (error) {
    console.log(error)
  }

  return {
    message: 'Successfully',
    newUser: updatedClient[1][0],
    tokens
  }

  

}
//-------------------------------------------------------------------------------------------------------//
  async getToken(client:Client){
    const jwtPayload = {
      id: client.id, 
      is_active:client.is_active
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
//-------------------------------------------------------------------------------------------------------//
  async findAll() {
    const data = await this.clientRepo.findAll()
    return data;
  }
//-------------------------------------------------------------------------------------------------------//
async remove(id:string) {
  const data = await this.clientRepo.destroy({where:{id}})
  return data;
}

async getOne(id:string) {
  const data = await this.clientRepo.findOne({where:{id}})
  return data;
}

async update(updateClientDto:UpdateClientDto,id:string){
  const data = await this.clientRepo.update(updateClientDto,{where:{id}, returning:true})

  return data[1][0]
}
  
}
