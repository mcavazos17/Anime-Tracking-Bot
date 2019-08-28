import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const Port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Anime Tracking Bot')
    .setDescription(
      'This API will interface with AniList.co in order to utilize their functions through DialogFlow for voice assistant compatablility.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(Port);
  logger.log(`Application listening on port: ${Port}`);
}
bootstrap();
