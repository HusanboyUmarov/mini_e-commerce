import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    password:string;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    is_creator:boolean;
}
