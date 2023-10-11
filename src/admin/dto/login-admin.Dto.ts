import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginAdminDto{
    @ApiProperty({example:'hasanboyumarov7@gmail.com', description:'admin/ creator email'})
    @IsNotEmpty()
    @IsString()
    email:string;

    @ApiProperty({example:'qwerty', description:'admin/ creator password'})
    @IsNotEmpty()
    @IsString()
    password:string;
}