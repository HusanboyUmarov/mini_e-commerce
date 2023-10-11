import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @ApiProperty({example:'iphone 14', description:`product name`})
    @IsString()
    @IsNotEmpty()
    name:string;

    @ApiProperty({example:1, description:`category id`})
    @IsNumber()
    @IsNotEmpty()
    category_id:number;

    @ApiProperty({example:1000, description:`product cost`})
    @IsNumber()
    @IsNotEmpty()
    cost:number;

    @ApiProperty({example:'black titan corpuse', description:`about product`})
    @IsString()
    @IsNotEmpty()
    description:string;

    @ApiProperty({example:20, description:`count product`})
    @IsNumber()
    @IsNotEmpty()
    count:number;
}
