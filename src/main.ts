import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Star Wars API by A. Voitenko')
    .setDescription(
      `This API was created while taking the 4th level of the Backend NODE.JS course from SHPP
      
      
      To use some methods entities are used,
      existing entities:
      - people
      - films
      - planets
      - species
      - starship
      - vehicles

      You must have an administrator account to add, edit, and delete entities.
      Administrator Credentials:
        Login: Admin
        Password: 123456

      !!!New accounts are registered with regular user rights and can only view data.
      `,
    )
    .setVersion('1.4')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
