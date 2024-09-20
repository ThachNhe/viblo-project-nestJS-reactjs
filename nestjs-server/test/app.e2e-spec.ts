import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';
import { AuthDTORegister } from 'src/auth/dto/auth.dto';
import { AuthService } from 'src/auth/auth.service';

describe('Register Auth (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  // REGISTER
  it('/auth/register (POST) - should register a user successfully', async () => {
    const registerData = {
      email: 'thachdinh@gmail.com',
      password: '123',
      fullName: 'dinh van thach',
      userName: 'thachdinh',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerData)
      .expect(201);

    const { body } = response;

    // Kiểm tra cấu trúc dữ liệu trả về
    expect(body).toHaveProperty('statusCode', 200);
    expect(body).toHaveProperty('err', null);
    expect(body).toHaveProperty('success', true);
    expect(body.data.user).toHaveProperty('email', registerData.email);
    expect(body.data.user).toHaveProperty('userName', registerData.userName);
    expect(body.data.user).toHaveProperty('fullName', registerData.fullName);
    expect(body.data.user).toHaveProperty('id');
    expect(body.data.user).toHaveProperty('created_at');
    expect(body.data.user).toHaveProperty('updated_at');
    expect(body.data.user).toHaveProperty('follower_number', 0);
    expect(body.data.user).toHaveProperty('star_number', 0);
    expect(body.data.user).toHaveProperty('post_number', 0);
    expect(body.data.user).toHaveProperty('isBlocked', false);
  });

  // REGISTER WITH MISSING DATA
  it('/auth/register (POST) - should return error when data is missing', async () => {
    const incompleteData = {
      email: 'thachdinhOK@gmail.com',
      // Thiếu password, fullName và userName
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(incompleteData)
      .expect(400);

    const { body } = response;

    expect(body).toHaveProperty('statusCode', 400);
  });
  //REGISTER WITH DUPLICATE DATA
  it('/auth/register (POST) - should register duplicate user', async () => {
    const registerData: AuthDTORegister = {
      email: 'thachdinh@gmail.com',
      password: 'yourpassword123',
      fullName: 'dinh van thach',
      userName: 'thachdinh',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerData)
      .expect(500);

    const { body } = response;

    // Kiểm tra cấu trúc dữ liệu trả về
    expect(body).toHaveProperty('statusCode', 500);
  });

  //REGISTER WITH INVALID EMAIL
  it('should return 400 for invalid email format', async () => {
    const registerData = {
      email: 'invalid-email',
      password: 'securePassword123',
      fullName: 'Test User',
      userName: 'testuser',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerData)
      .expect(400);

    const { body } = response;
    expect(body).toHaveProperty('statusCode', 400);
    expect(body.message).toContain('email must be an email');
  });

  it('/auth/login (POST) - should login a user with username successfully', async () => {
    const loginData = {
      userName: 'thachdinh',
      password: '123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(201);

    const { body } = response;

    // Kiểm tra cấu trúc dữ liệu trả về
    expect(body).toHaveProperty('statusCode', 200);
    expect(body).toHaveProperty('error', null);
    expect(body).toHaveProperty('success', true);
    expect(body).toHaveProperty('accessToken');
    expect(body.data).toHaveProperty('user');
  });

  it('/auth/login (POST) - should login a user with email successfully', async () => {
    const loginData = {
      email: 'thachdinh@gmail.com',
      password: '123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(201);

    const { body } = response;

    // Kiểm tra cấu trúc dữ liệu trả về
    expect(body).toHaveProperty('statusCode', 200);
    expect(body).toHaveProperty('error', null);
    expect(body).toHaveProperty('success', true);
    expect(body).toHaveProperty('accessToken');
    expect(body.data).toHaveProperty('user');
  });

  it('/auth/login (POST) - should login a user with password wring failed', async () => {
    const loginData = {
      email: 'thachdinh@gmail.com',
      password: '1234',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(401);

    const { body } = response;

    // Kiểm tra cấu trúc dữ liệu trả về
    expect(body).toHaveProperty('statusCode', 401);
  });

  afterAll(async () => {
    await app.close(); // Đóng ứng dụng sau khi test xong
  });
});
