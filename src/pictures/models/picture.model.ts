import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "../../products/models/product.model";

interface CreateImagesAttr{
    product_id:number;
    file_name: string;
}

@Table({tableName:'pictures'})
export class Picture extends Model<Picture, CreateImagesAttr> {
    @ApiProperty({example:1, description:`picture id`})
    @Column({
        type:DataType.INTEGER, 
        primaryKey:true,
        autoIncrement:true})
    id:number;

    @ApiProperty({example:1, description:`product id`})
    @ForeignKey(()=>Product)
    @Column({
        type:DataType.INTEGER,
        allowNull:false})
    product_id:number;

    @ApiProperty({example:1, description:`picture id`})
    @Column({
        type:DataType.STRING,
        allowNull:false})
    file_name: string;

    @BelongsTo(()=>Product)
    product:Product
}
