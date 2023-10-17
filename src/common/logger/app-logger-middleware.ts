import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as moment from 'moment';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  constructor(private logger: Logger, private configService: ConfigService) {
    // logger.setContext('Request');
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const { method } = request;
    const start = moment(Date.now()).format(
      this.configService.get<string>('server.defaultDateTimeFormat'),
    );
    const { logger, configService } = this;
    // const userId = request.user ? request.user['id'] : '';
    const userId = '';
    const log =
      start +
      ' | ' +
      method +
      ' | ' +
      'userId: ' +
      userId +
      ' | ' +
      request.params[0].replace('/', ' | id: ') +
      ' | ' +
      'query: ' +
      JSON.stringify(request.query) +
      ' | ' +
      'body: ' +
      JSON.stringify(request.body) +
      ' | ';
    this.logger.log(log);
    response.on('close', () => {
      const { statusCode } = response;
      logger.log(
        'END: ' +
          statusCode +
          ' | ' +
          moment(Date.now()).format(
            configService.get<string>('server.defaultDateTimeFormat'),
          ),
      );
    });

    next();
  }
}
