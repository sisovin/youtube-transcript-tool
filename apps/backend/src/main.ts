import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { GlobalExceptionFilter } from './shared/exception-filters/global-exception-filter';
import { RequestValidationPipe } from './shared/pipes/request-validation.pipe';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { configureSwagger } from './shared/swagger/swagger.config';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new RequestValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  configureSwagger(app);

  await app.listen(3000);
}
bootstrap();
