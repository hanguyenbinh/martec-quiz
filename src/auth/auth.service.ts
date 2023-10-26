import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResult } from 'src/common/http/http-result.http';
import {
  Repository,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/entities/users.entity';
import { FacebookLoginDto } from 'src/dtos/facebook-login.dto';
import { FaceBookGraphApiService } from 'src/face-book-graph-api/face-book-graph-api.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private logger: Logger,
    private facebookService: FaceBookGraphApiService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) { }

  async login(input: FacebookLoginDto) {
    const now = new Date();
    let user = await this.usersRepository.findOne(
      { where: { facebookUserId: input.facebookUserId } });
    if (!user) {
      user = {
        ...user,
        ...input
      }
      user.updatedAt = now;
      user.lastLoginTime = now;
    }
    else {
      user = this.usersRepository.create({ ...input, createdAt: now, lastLoginTime: now })
    }
    const result = await this.usersRepository.save(user);
    
    const accessToken = this.jwtService.sign({...user}, {
      expiresIn: this.configService.get('jwt.signOptions.expiresIn')
    });
    
    return new HttpResult({
      data: {
        userId: user.id,
        accessToken,
      },
      message: 'LOGIN_SUCCESS',
    });
  }

  async validateToken(token: string) {
    try {
      const isValid = this.jwtService.verify(token);
      if (!isValid) {
        return new HttpResult({
          status: false,
          message: 'INVALID_TOKEN',
        });
      }
      return new HttpResult({
        message: 'TOKEN_VALIDATED',
        data: {
          isValid: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      return new HttpResult({
        status: false,
        message: 'INVALID_TOKEN',
      });
    }
  }

  async validate(id: string) {
    try {
      const user: any = await this.usersRepository.findOne(
        { where: { id }, }
      );

      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      this.logger.error(error);
    }

    return null;
  }
}
