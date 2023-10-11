import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({example:'iphone 14', description:`product name`})
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name:string;

    @ApiProperty({example:1, description:`category id`})
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    category_id:number;

    @ApiProperty({example:1000, description:`product cost`})
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    cost:number;
    @ApiProperty({example:'black titan corpuse', description:`about product`})
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description:string;

    @ApiProperty({example:20, description:`count product`})
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    count:number;
}
