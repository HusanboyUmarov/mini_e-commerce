import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginClientDto{
    @ApiProperty({example:'husanboyumarov7@gmail.com', description:'created user email'})
    @IsString()
    @IsNotEmpty()
    email:string;

    @ApiProperty({example:'ascoder2000', description:'created user password'})
    @IsString()
    @IsNotEmpty()
    password:string;
}