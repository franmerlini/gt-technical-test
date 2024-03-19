import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppConfigKeys, HttpExceptionFilter, cors, logger, validationPipe } from '@gt-technical-test/libs/api/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const apiPrefix = configService.get(AppConfigKeys.API_PREFIX);
  const protocol = configService.get(AppConfigKeys.API_PROTOCOL);
  const host = configService.get(AppConfigKeys.API_HOST);
  const port = configService.get(AppConfigKeys.PORT);
  const reflector = app.get(Reflector);

  app.setGlobalPrefix(apiPrefix);
  app.enableCors(cors);
  app.useGlobalPipes(validationPipe);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.use(logger);

  await app.listen(port);

  Logger.log(`🚀 Application is running on: ${protocol}://${host}:${port}/${apiPrefix}`);
}

bootstrap();
