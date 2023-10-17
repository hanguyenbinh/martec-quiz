import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private reqLogger: Logger = new Logger('request');
  private reslogger: Logger = new Logger('response');
  constructor(private readonly configService: ConfigService) {}
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { originalUrl, method, params, query, body } = req;
    const { reslogger, reqLogger, configService } = this;
    const userId = req.user ? req.user['id'] : '';
    const log =
      method +
      ' | ' +
      originalUrl +
      ' | ' +
      'userId: ' +
      userId +
      ' | ' +
      'param: ' +
      JSON.stringify(params) +
      ' | ' +
      'query: ' +
      JSON.stringify(query) +
      ' | ' +
      'body: ' +
      JSON.stringify(body) +
      ' | ';
    reqLogger.log(log);
    return next.handle().pipe(
      tap((data) => {
        let responseLog =
          moment(Date.now()).format(
            configService.get('server.defaultDateTimeFormat'),
          ) + ' | ';
        const stringData = data.data ? JSON.stringify(data) : '';
        if (stringData.length > 100) {
          responseLog += JSON.stringify({
            status: data.status,
            message: data.message,
          });
        } else {
          responseLog += JSON.stringify(data);
        }
        reslogger.log(responseLog);
      }),
    );
  }
}
