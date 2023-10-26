import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShareImageDto } from 'src/dtos/share-image.dto';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Media } from 'src/entities/media.entity';

@Injectable()
export class FaceBookGraphApiService {
    private igUserId = '17841444429991526';
    private shareMedia = '17841444429991526/media';
    private publishMedia = '17841444429991526/media_publish';
    private accountInfo = '/{fbUserId}/accounts'
    constructor(
        private httpService: HttpService,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(Media)
        private readonly mediaRepository: Repository<Media>,
    ) {

    }

    async getIGAccount(fbUserId: string, accessToken: string) {
        try {
            const url = '140498459427968';
            console.log(url, accessToken)
            const result = await this.httpService.get(url, {
                params: {
                    access_token: accessToken,
                    fields: 'instagram_business_account'
                }
            }).toPromise();
            return result.data?.data;
        }
        catch (error) {
            console.log({ ...error })
        }
        return [];

    }

    async shareImage(input: ShareImageDto, user: any) {
        try {
            const result = await this.httpService.post(this.shareMedia, {

                image_url: input.imageUrl,
                access_token: user.accessToken
            }).toPromise();
            console.log(result.data)
            const creationId = result.data.id;
            
            const publishResult = await this.httpService.post(this.publishMedia.replace('{creationId}', creationId), {
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
