import { Injectable } from '@nestjs/common';
import { ShareImageDto } from './dtos/share-image.dto';

@Injectable()
export class AppService {
  shareImage(input: ShareImageDto) {

  }
}
