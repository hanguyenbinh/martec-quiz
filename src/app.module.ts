import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const host = process.env.REDIS_HOST
          ? process.env.REDIS_HOST
          : configService.get('redis.host');
        const port = parseInt(process.env.REDIS_PORT
          ? process.env.REDIS_PORT
          : configService.get('redis.port'));
        let password = process.env.REDIS_PASSWORD
          ? process.env.REDIS_PASSWORD
          : configService.get('redis.password');
        if (!password) {
          password = '';
        }
        const ttl = configService.get('redis.ttl'); 
        return {
          store: redisStore,
          socket: {
            host,
            port
          },
          password,
          ttl,
        };
      },
      inject: [ConfigService],
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const typeormConfig = configService.get('database');
        
        if (process.env.MYSQL_HOST) {
          typeormConfig.host = process.env.MYSQL_HOST;
        }
        if (process.env.MYSQL_PORT) {
          typeormConfig.port = +process.env.MYSQL_PORT;
        }
        if (process.env.MYSQL_USERNAME) {
          typeormConfig.username = process.env.MYSQL_USERNAME;
        }
        if (process.env.MYSQL_PASSWORD) {
          typeormConfig.password = process.env.MYSQL_PASSWORD;
        }
        if (process.env.MYSQL_DATABASE) {
          typeormConfig.database = process.env.MYSQL_DATABASE;
        }
        console.log(typeormConfig)
        return typeormConfig;
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
