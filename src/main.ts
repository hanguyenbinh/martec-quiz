import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configuration from './config/configuration';
import { ValidationError, useContainer } from 'class-validator';
import { mapChildrenToValidationErrors } from './common/utils/validation.utils';
import { ValidationPipe } from '@nestjs/common';
import { iterate } from 'iterare';
import { InvalidInputException } from './common/exceptions/invalid-input.exception';
import { readFileSync } from 'fs';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

async function bootstrap() {
  const appConfig = configuration() as any;
  const httpsOptions = {
    key: readFileSync('./letsencrypt/key.pem'),
    cert: readFileSync('./letsencrypt/cert.pem'),
  };
  const app = await NestFactory.create(AppModule, {httpsOptions});
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // disableErrorMessages: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = iterate(validationErrors)
          .map((error) => mapChildrenToValidationErrors(error))
          .flatten()
          .filter((item) => !!item.constraints)
          .map((item) => Object.values(item.constraints))
          .flatten()
          .toArray();
        return new InvalidInputException(
          errors.length > 0 ? (errors[0] as string) : '',
        );
      },
    }),
  );
  app.enableCors();
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector, appConfig),);
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Home assignment for backend developer')
    .setDescription('API description - by binh.ha@vtl-vtl.com')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
  await app.listen(
    +appConfig.server.port || 3000,
    appConfig.server.host || '0.0.0.0', 
  );
}
bootstrap();
