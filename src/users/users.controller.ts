import {  Controller, Get, Query, Param, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
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
    
    @Get(':id')
    async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.service.deleteUser(id);
    }
}
