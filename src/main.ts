import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'express-handlebars';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['verbose', 'debug', 'log'],
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));

  //** handlebars 핵심 설정 시작 **//
  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      defaultLayout: 'default', // 기본 레이아웃 파일 main.hbs 지정, 요청에 따라 레이아웃을 변경할수 있다.
      layoutsDir: join(__dirname, '..', '/views/layout/'), // 헨들바템플릿의 레이아웃 파일의 위치
      partialsDir: join(__dirname, '..', '/views/module/'), // 파티셜이란: 레이아웃을 채울 header.hbs, left.hbs, footer.hbs 파일의 위치
    }),
  );

  app.set('view engine', 'hbs'); // handlebars파일의 확장자를 hbs로 사용.

  await app.listen(7001);

  console.log(await app.getUrl());
}
bootstrap();
