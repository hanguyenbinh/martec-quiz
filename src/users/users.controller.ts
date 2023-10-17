import { Body, Controller, Get, Post, Query, Param, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('users')
@ApiTags('Users')
@UseInterceptors(CacheInterceptor)
export class UsersController {
    constructor(private readonly service: UsersService) { }

    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async getUsers(
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        return this.service.getUsers(page, limit);
    }

    @Get(':id')
    async getUser(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.service.getUser(id);
    }
    @Post()
    async createUser(@Body() input: CreateUserDto) {
        return this.service.createUser(input.id1, input.id2);
    }
    
    @Get(':id')
    async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.service.deleteUser(id);
    }
}
