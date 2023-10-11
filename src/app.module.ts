import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { Client } from './client/model/client.model';
import { Admin } from './admin/models/admin.model';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/models/category.model';
import { Product } from './products/models/product.model';
import { PicturesModule } from './pictures/pictures.module';
import { FilesModule } from './files/files.module';
import { Picture } from './pictures/models/picture.model';
import { PurchuseModule } from './purchuse/purchuse.module';
import { HistoryModule } from './history/history.module';
import { History } from './history/models/history.model';
import { Purchuse } from './purchuse/models/purchuse.model';


@Module({
  imports:
   [
    ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
  }),
  SequelizeModule.forRoot({
    dialect:'postgres',
    port:Number(process.env.POSTGRES_PORT),
    password: process.env.POSTGRES_PASSWORD,
    host:process.env.POSTGRES_HOST,
    username:process.env.POSTGRES_USER,
    database:process.env.POSTGRES_DB,
    models:[Client,Admin,Category,Product,Picture, History, Purchuse],
    logging:true,
    autoLoadModels:true
  }),
  MailModule,
  AdminModule,
  ClientModule,
  ProductsModule,
  CategoryModule,
  PicturesModule,
  FilesModule,
  PurchuseModule,
  HistoryModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
