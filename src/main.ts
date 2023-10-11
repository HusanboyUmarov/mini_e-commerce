import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import {ValidationPipe} from '@nestjs/common'
async function start() {
  try {
    const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
  .setTitle(`muddatli to'lov magazin`)
  .setDescription(`Kichik magazinlar uchun muddalti to'lovlarni amalga oshirish uchun loyiha`)
  .setVersion('1.0.0')
  .addTag('Nodejs, Nestjs, Postgres, Sequelize, Swagger, Jwt, uuid')
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())


  await app.listen(process.env.PORT, ()=>{
    console.log(`port is listening on ${process.env.PORT}`)
    console.log(new Date())
  });
    
  } catch (error) {
    
    console.log(error)
    
  }
}
start()
