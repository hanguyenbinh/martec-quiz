import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { FaceBookGraphApiModule } from './face-book-graph-api/face-book-graph-api.module';

@Module({
  imports: [
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
        
        if (process.env.POSTGRESQL_HOST) {
          typeormConfig.host = process.env.POSTGRESQL_HOST;
        }
        if (process.env.POSTGRESQL_PORT) {
          typeormConfig.port = +process.env.POSTGRESQL_PORT;
        }
        if (process.env.POSTGRESQL_USERNAME) {
          typeormConfig.username = process.env.POSTGRESQL_USERNAME;
        }
        if (process.env.POSTGRESQL_PASSWORD) {
          typeormConfig.password = process.env.POSTGRESQL_PASSWORD;
        }
        if (process.env.POSTGRESQL_DATABASE) {
          typeormConfig.database = process.env.POSTGRESQL_DATABASE;
        }
        console.log(typeormConfig)
        return typeormConfig;
      },
    }),
    UsersModule,
    AuthModule,
    FaceBookGraphApiModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule { }
