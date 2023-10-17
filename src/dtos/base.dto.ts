import { ApiHideProperty } from '@nestjs/swagger';

export abstract class BaseDto {
  @ApiHideProperty()
  createdBy: number;

  @ApiHideProperty()
  updatedBy: number;

  @ApiHideProperty()
  deletedBy: number;

  @ApiHideProperty()
  userId: number;

  @ApiHideProperty()
  deletedAt: Date;
}
