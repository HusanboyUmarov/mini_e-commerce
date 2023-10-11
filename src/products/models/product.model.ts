import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "../../category/models/category.model";
import { Picture } from "../../pictures/models/picture.model";

interface CreateProductAttr{
    name:string;
    category_id:number;
    const:number;
    description:string;
    is_active:boolean;
    count:number;
}

@Table({tableName:'product'})
export class Product extends Model<Product, CreateProductAttr>{
    @ApiProperty({example:1, description:`product id`})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true, 
        primaryKey:true})
    id:number;

    @ApiProperty({example:'iphone 14', description:`product name`})
    @Column({
        type:DataType.STRING,
        allowNull: false})
    name:string;
    @ForeignKey(()=>Category)
    @ApiProperty({example:1, description:`category id`})
    @Column({
        type:DataType.INTEGER,
        })
    category_id:number;

    @ApiProperty({example:1000, description:`product cost`})
    @Column({
        type:DataType.DOUBLE,
        })
    cost:number;

    @ApiProperty({example:'black titan corpuse', description:`about product`})
    @Column({
        type:DataType.STRING,
        allowNull: false})
    description:string;

    
    @Column({
        type:DataType.BOOLEAN,
        defaultValue:true})
    is_active:boolean;

    @ApiProperty({example:20, description:`count product`})
    @Column({
        type:DataType.INTEGER,
        allowNull:false})
    count:number;
    @HasMany(()=>Picture)
    pictures: Picture[]
}
