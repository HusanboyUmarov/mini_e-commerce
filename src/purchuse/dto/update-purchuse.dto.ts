import { PartialType } from '@nestjs/swagger';
import { CreatePurchuseDto } from './create-purchuse.dto';

export class UpdatePurchuseDto extends PartialType(CreatePurchuseDto) {}
