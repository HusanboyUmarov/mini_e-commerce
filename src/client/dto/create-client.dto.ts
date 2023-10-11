import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsStrongPassword } from "class-validator";


export class CreateClientDto {
    @ApiProperty({example:'Alisher', description:`user's name`})
    @IsString()
    @IsNotEmpty()
    first_name:string;

    @ApiProperty({example:'Qobilov', description:`user's last name`})
    @IsString()
    @IsNotEmpty()
    last_name:string;

    @ApiProperty({example:'+998916521677', description:`user's phone number`})
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({example:'husanboyumarov7@gmail.com', description:`user's email`})
    @IsString()
    @IsNotEmpty()
    email:string;

    @ApiProperty({example:'ascoder2000', description:`user's password`})
    @IsString()
    @IsNotEmpty()
    password:string;

    @ApiProperty({example:'ascoder2000', description:`repit user's password`})
    @IsString()
    @IsNotEmpty()
    confirm_password:string;

    @ApiProperty({example:'AC1234567', description:`user's passport number`})
    @IsString()
    @IsNotEmpty()
    passport_number:string;

    @ApiProperty({example:'Fergana Rishton', description:`user's living place`})
    @IsString()
    @IsNotEmpty()
    living_place: string
}
