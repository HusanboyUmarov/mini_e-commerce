import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, DataType } from "sequelize-typescript";

export class CreateHistoryDto {
    @ApiProperty({example:'2023-10-09T16:43:47.755Z', description:'time'})
    @IsNotEmpty()
    paying_date:Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:'card/cash', description:'kind of paying method'})  
    paying_method:string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example:200, description:'amount'})
    payment:number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example:1, description:'purchesed id'})
    purchused_id:number;
}
