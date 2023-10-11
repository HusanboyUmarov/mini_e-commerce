import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Purchuse } from "../../purchuse/models/purchuse.model";

interface CreateHistoryAttr{
    paying_date:Date;
    paying_method:string;
    payment:number;
}

@Table({tableName:'history'})
export class History extends Model<History, CreateHistoryAttr>{
    @ApiProperty({example:1, description:'history id'})
    @Column({
        type:DataType.INTEGER, 
        autoIncrement:true, 
        primaryKey:true})
    id:number;

    @ApiProperty({example:'2023-10-09T16:43:47.755Z', description:'time'})
    @Column({
        type:DataType.DATE})
    paying_date:Date;

    @ApiProperty({example:'card/cash', description:'kind of paying method'})
    @Column({
        type:DataType.STRING})    
    paying_method:string;

    @ApiProperty({example:200, description:'amount'})
    @Column({
        type:DataType.DECIMAL})
    payment:number;

    @ApiProperty({example:200, description:'amount'})
    @ForeignKey(()=>Purchuse)
    @Column({
        type:DataType.INTEGER})
    purchused_id:number;

    @BelongsTo(()=>Purchuse)
    purchuse:Purchuse
}
