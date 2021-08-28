import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseTransformInterceptor } from '@interceptor/response-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.get<string>('appApiPrefix'));
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  await app.listen(configService.get<number>('appPort'));
}
bootstrap();
