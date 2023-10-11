import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example:`phone`, description:`name of category`})
    @IsNotEmpty()
    @IsString()
    name:string
}
