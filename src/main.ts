import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function start() {
  const PORT = process.env.PORT || 3333;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Lesson of advanced BACKEND')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('ULBI TV')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  //app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () =>
    console.log(`Server started on PORT ${PORT} in mode ${process.env.NAME}`)
  );
}

start();
