import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function configureSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('YouTube Transcript Tool API')
    .setDescription('API documentation for the YouTube Transcript Tool')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
