import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { JwtStrategy } from './strategy/jwt.strategy';


@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get('jwt');
      },
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [JwtStrategy, AuthService, Logger],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
