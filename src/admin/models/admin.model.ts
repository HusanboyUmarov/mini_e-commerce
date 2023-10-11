import { Column, DataType, Model, Table } from "sequelize-typescript";

interface createAdminDto{
    first_name: string;
    last_name: string;
    username:string;
    email: string;
    password:string;
    is_creator:boolean;
}

@Table({tableName:'admin'})
export class Admin extends Model<Admin, createAdminDto> {
    @Column({
        type:DataType.INTEGER, 
        autoIncrement:true,
        primaryKey:true})
    id:number;

    @Column({
        type:DataType.STRING})
    first_name: string;

    @Column({
        type:DataType.STRING})
    last_name: string;

    @Column({
        type:DataType.STRING})
    username:string;

    @Column({
        type:DataType.STRING})
    email: string;

    @Column({
        type:DataType.STRING})
    password:string;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    is_creator:boolean;
}
