import { IsString, IsNotEmpty, IsStrongPassword, IsOptional } from "class-validator";
import { PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
    @IsOptional()
    first_name:string;

    @IsOptional()
    last_name:string;

    @IsOptional()
    phone: string;

    @IsOptional()
    email:string;

    @IsOptional()
    password:string;

    @IsOptional()
    passport_number:string;

    @IsOptional()
    living_place: string
}
