import { Controller, Post, Body } from '@nestjs/common';
import { ShareImageDto } from './dtos/share-image.dto';
import { FaceBookGraphApiService } from './face-book-graph-api/face-book-graph-api.service';
import { CurrentUser } from './auth/decorator/current-user.decorator';
import { HttpResult } from './common/http/http-result.http';

@Controller()
export class AppController {
  constructor(private readonly service: FaceBookGraphApiService) {}

@Post('share-image')
async shareImage(@Body() input: ShareImageDto, @CurrentUser() user,){
  const result = this.service.shareImage(input, user);
  return new HttpResult({
    status: result ? true:false,
    data: result,
    message: 'PUBLISH_IMAGE_COMPLETE'
  })
}
}
