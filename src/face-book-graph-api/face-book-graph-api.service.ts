import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShareImageDto } from 'src/dtos/share-image.dto';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Media } from 'src/entities/media.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FaceBookGraphApiService {
    private igUserId = '';
    private shareMedia = 'media';
    private publishMedia = 'media_publish';
    constructor(
        private httpService: HttpService,
        private configService: ConfigService,        
        @InjectRepository(Media)
        private readonly mediaRepository: Repository<Media>,
    ) {
        this.igUserId = this.configService.get('facebook.igUserId');
    }    

    async shareImage(input: ShareImageDto, user: any) {
        try {
            const result = await this.httpService.post(`${this.igUserId}/${this.shareMedia}`, {

                image_url: input.imageUrl,
                access_token: user.accessToken
            }).toPromise();
            console.log(result.data)
            const creationId = result.data.id;
            
            const publishResult = await this.httpService.post(`${this.igUserId}/${this.publishMedia}`, {
                creation_id: creationId,
                access_token: user.accessToken
            }).toPromise();
            console.log(result.data)
            const containerId = publishResult.data.id
            const media = this.mediaRepository.create({
                creationId,
                containerId,
                igUserId: this.igUserId

            });
            return this.mediaRepository.save(media);
        }
        catch (error) {
            console.log('error', error)
        }
        return null;

    }
}
