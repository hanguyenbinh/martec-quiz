import { Module, Global } from '@nestjs/common';
import { FaceBookGraphApiService } from './face-book-graph-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Agent } from 'https';
import { Media } from 'src/entities/media.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Media
    ]),
    HttpModule.register({
      baseURL: 'https://graph.facebook.com/v18.0/',
      httpsAgent: new Agent({
        rejectUnauthorized: false
      })
    })
  ],
  providers: [FaceBookGraphApiService],
  exports: [FaceBookGraphApiService]
})
export class FaceBookGraphApiModule {}
