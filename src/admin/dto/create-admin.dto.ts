import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({example:'Husanboy', description:`admin's name`})
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({example:'Umarov', description:`admin's last_name`})
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({example:'ascoder', description:`admin's username`})
    @IsString()
    @IsNotEmpty()
    username:string;

    @ApiProperty({example:'husanboyumarov7@gmail.com', description:`admin's email`})
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example:'qwerty', description:`admin's password`})
    @IsString()
    @IsNotEmpty()
    password:string;
}
