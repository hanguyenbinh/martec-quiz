import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty, IsPositive, IsUUID, Matches,
} from 'class-validator';
import { BaseDto } from './base.dto';
import { Type } from 'class-transformer';

export class CreateUserDto extends BaseDto {
  @ApiProperty({
    example: '3d655c77-2bc2-4778-ba76-acc1dd289fe7',
    description: 'id 1, uuid v4 format',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID('4')
  id1: string;

  @ApiProperty({
    example: '3d655c77-2bc2-4778-ba76-acc1dd289fe7',
    description: 'id 2, uuid v4 format',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID('4')
  id2: string;
}
