import { ApiProperty } from "@nestjs/swagger";
import { LargeNumberLike } from "crypto";
import { Model, Table,Column,DataType } from "sequelize-typescript";

interface createClientAttr{
    first_name:string;
    last_name:string;
    phone: string;
    email:string;
    password:string;
    passport_number:string;
    is_active:boolean;
    living_place: string;
    hashed_refresh_token:string;
    activation_link:string;
}

@Table({tableName:'client'})

export class Client extends Model<Client, createClientAttr> {
    @ApiProperty({example:1, description:'client id'})
    @Column({
        type:DataType.INTEGER, 
        autoIncrement:true,
        primaryKey:true})
    id:number;

    @ApiProperty({example:'Alisher', description:'client first_name'})
    @Column({
        type:DataType.STRING,
        allowNull:false})
    first_name:string;
    
    @ApiProperty({example:'Qosimov', description:'client last_name'})
    @Column({
        type:DataType.STRING,
        allowNull:false})
    last_name:string;

    @ApiProperty({example:'+998911234567', description:'client phone number'})
    @Column({
        type:DataType.STRING,
        allowNull:false})
    phone: string;

    @ApiProperty({example:'example@gmail.com', description:'client mail'})
    @Column({
        type:DataType.STRING,
        allowNull:false})
    email:string;

    @ApiProperty({example:'qwerty', description:'client password'})
    @Column({
        type:DataType.STRING,
        allowNull:false})
    password:string;

    @ApiProperty({example:'AC1234567', description:'client passport number'})
    @Column({
        type:DataType.STRING,
        allowNull:false})
    passport_number:string;

    @ApiProperty({example:'Tashkent city Yunusobot street uzbelistan house-12', description:'client living place'})
    @Column({
        type:DataType.STRING,
        allowNull:false})
    living_place: string;

    @ApiProperty({example:'generate', description:'refresh token'})
    @Column({
        type:DataType.STRING,
       })
    hashed_refresh_token: string;

    @ApiProperty({example:'generete link', description:'for activating link'})
    @Column({
        type:DataType.STRING,})
    activation_link: string;

    @ApiProperty({example:false, description:'confirm gmail belongs to user'})
    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false})
    is_active: boolean;
}
