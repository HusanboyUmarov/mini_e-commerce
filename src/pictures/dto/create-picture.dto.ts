import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreatePictureDto {

    @ApiProperty({example:1, description:`product id`})
    @Type(()=>Number)
    product_id:number;
}
