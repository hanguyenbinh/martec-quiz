import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUrl } from 'class-validator';

export class ShareImageDto {

  @ApiProperty({
    example: 'https://domain.com/image.jpeg',
    description: 'public image to share',
    required: true,
  })
  @IsUrl()
  @Type(() => String)
  imageUrl: string;  
}
