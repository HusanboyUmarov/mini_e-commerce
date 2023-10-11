import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Column } from "sequelize-typescript";

export class CreatePurchuseDto {

    @ApiProperty({example:1, description:'client id'})
    client_id: number;

    @ApiProperty({example:'2023-10-09T16:11:39.367Z', description:'purchesing time'})
    purchused_time: Date;

    @ApiProperty({example:1, description:'number of months'})
    @IsNumber()
    @IsNotEmpty()
    duration: number;

    @ApiProperty({example:200, description:'fee by month'})
    @IsNumber()
    @IsNotEmpty()
    paying_monthly:number;

    @ApiProperty({example:1, description:'client total paid money'})
    @IsNumber()
    @IsNotEmpty()
    total_count:number;

    @ApiProperty({example:1, description:'cashier id'})
    @IsNumber()
    @IsNotEmpty()
    chashier: number;
    
    @ApiProperty({example:1, description:'product id'})
    @IsNumber()
    @IsNotEmpty()
    product_id:number;
}
