import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    // .addBearerAuth()
    // .addApiKey(
    //   { type: 'apiKey', name: 'x-client-id', in: 'header' },
    //   'x-client-id',
    // )
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
  await app.listen(3000);
}
bootstrap();
