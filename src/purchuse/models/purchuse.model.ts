import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Admin } from "../../admin/models/admin.model";
import { Client } from "../../client/model/client.model";
import { History } from "../../history/models/history.model";
import { Product } from "../../products/models/product.model";

interface CreatePurchuseAttr{
    history_id: number ;
    client_id: number;
    purchused_time: Date;
    duration: number;
    paying_monthly:number;
    total_count:number;
    chashier: number;
    is_paying:false;
    product_id:number;
}

@Table({tableName:'purchuse'})

export class Purchuse  extends Model<Purchuse, CreatePurchuseAttr>{
    @ApiProperty({example:1, description:'purches id'})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true})
    id:number;

    @ApiProperty({example:1, description:'client id'})
    @ForeignKey(()=>Client)
    @Column({
        type:DataType.INTEGER,
    allowNull:false})
    client_id: number;
    @BelongsTo(()=>Client)
    client: Client

    @ApiProperty({example:'2023-10-09T16:11:39.367Z', description:'purchesing time'})
    @Column({
        type:DataType.DATE,
    allowNull:false})
    purchused_time: Date;

    @ApiProperty({example:1, description:'number of months'})
    @Column({
        type:DataType.INTEGER,
    allowNull:false})
    duration: number;

    @ApiProperty({example:200, description:'fee by month'})
    @Column({
        type:DataType.DECIMAL,
    allowNull:false})
    paying_monthly:number;

    @ApiProperty({example:1, description:'client total paid money'})
    @Column({
        type:DataType.DECIMAL,
    defaultValue:0})
    total_count:number;

    @ForeignKey(()=>Admin)
    @ApiProperty({example:1, description:'cashier id'})
    @Column({
        type:DataType.INTEGER,
    allowNull:false})
    chashier: number;
    @BelongsTo(()=>Admin)
    admin:Admin

    @ApiProperty({example:false, description:'status is_paying'})
    @Column({
        type:DataType.BOOLEAN,
    defaultValue:false})
    is_paying:false;
    
    @ApiProperty({example:1, description:'product id'})
    @ForeignKey(()=>Product)
    @Column({
    type:DataType.INTEGER,
    allowNull:false})
    product_id:number;
    @BelongsTo(()=>Product)
    product:Product

    @HasMany(()=>History)
    histories:History[];
}
