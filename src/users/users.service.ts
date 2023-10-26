import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResult } from 'src/common/http/http-result.http';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    private pageSize: number;
    private logger: Logger = new Logger(UsersService.name);
    constructor(
        private configService: ConfigService,


        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {
        this.pageSize = this.configService.get<number>('server.pagination.pageSize');
    }

    async getUsers(page: number, limit: number) {
        const take = limit || this.pageSize;
        const skip = ((page || 1) - 1) * take;
        const [list, count] = await this.usersRepository
            .createQueryBuilder('Users')
            .skip(skip)
            .take(take)
            .getManyAndCount();
        return new HttpResult({
            message: 'GET_USERS_SUCCESS',
            data: {
                list,
                count,
            },
        });
    }

    async getUser(id: string) {
        const user = await this.usersRepository
            .findOne({
                where: {
                    id
                }
            });
        if (!user) {
            return new HttpResult({
                status: false,
                message: 'USER_NOT_FOUND',
                data: {
                    id
                },
            });
        }
        return new HttpResult({
            message: 'GET_USERS_SUCCESS',
            data: user
        });
    }

    

    async deleteUser(id: string) {
        const user = await this.usersRepository.findOne(
            {
                where: {
                    id
                }
            }
        )
        if (!user) {
            return new HttpResult({
                status: false,
                message: 'USER_NOT_FOUND',
                data: {
                    id
                },
            });
        }
        const now = new Date();
        user.deletedAt = now;

        const result = await this.usersRepository.save(user);
        return new HttpResult({
            message: 'USER_IS_REMOVED_SUCCESS',
            data: result
        });
    }
}
