import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { ValidationPipe } from '@nestjs/common';

export async function createTestApp(providers: any[] = []) {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    providers: [...providers], // Truyền các provider tùy chỉnh vào đây
  }).compile();

  const app = moduleFixture.createNestApplication();

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  return { app };
}
