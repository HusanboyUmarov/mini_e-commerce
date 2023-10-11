import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "../../products/models/product.model";

interface CreateCategoryAttr{
    name:string;

}

@Table({tableName: 'category'})
export class Category extends Model<Category, CreateCategoryAttr> {
    @ApiProperty({example:1, description:'category id'})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true, 
        primaryKey:true})
    id:number;

    @ApiProperty({example:'phones', description:`item's category`})
    @Column({
        type:DataType.STRING,
        allowNull:false})
    name:string;

    @HasMany(()=>Product)
    Products:Product[]

}
