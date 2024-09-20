import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { AuthDTORegister } from 'src/auth/dto/auth.dto';
import { DatabaseClearUtil } from './database-clear.util';

describe('Auth Module (e2e)', () => {
  let app: INestApplication;
  let appModule: AppModule;
  let requestAgent: any;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [DatabaseClearUtil],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    appModule = app.get<AppModule>(AppModule);
    await app.init();
    requestAgent = request(app.getHttpServer());
    await appModule.clearDatabase();
  });

  let commonExpectFunction = (body: any, key: any, value: any) => {
    expect(body).toHaveProperty(key, value);
  };

  describe('POST /auth/register', () => {
    it('Should register a user successfully', async () => {
      const registerData = {
        email: 'thachdinhOKOK1@gmail.com',
        password: '123',
        fullName: 'dinh van thach',
        userName: 'thachdinhOKOK1',
      };

      const response = await requestAgent
        .post('/auth/register')
        .send(registerData)
        .expect(201);

      const { body } = response;

      commonExpectFunction(body, 'statusCode', 200);
      commonExpectFunction(body, 'err', null);
      commonExpectFunction(body, 'success', true);
      commonExpectFunction(body.data.user, 'email', registerData.email);
      commonExpectFunction(body.data.user, 'userName', registerData.userName);
      commonExpectFunction(body.data.user, 'fullName', registerData.fullName);
      commonExpectFunction(body.data.user, 'id', expect.any(String));
      commonExpectFunction(body.data.user, 'follower_number', 0);
      commonExpectFunction(body.data.user, 'star_number', 0);
      commonExpectFunction(body.data.user, 'post_number', 0);
      commonExpectFunction(body.data.user, 'isBlocked', false);
    });

    // REGISTER WITH MISSING DATA
    it('should return error when data is missing', async () => {
      const incompleteData = {
        email: 'thachdinhOK@gmail.com',
      };

      const response = await requestAgent
        .post('/auth/register')
        .send(incompleteData)
        .expect(400);

      const { body } = response;

      commonExpectFunction(body, 'statusCode', 400);
      commonExpectFunction(body, 'error', 'Bad Request');
    });
    //REGISTER WITH DUPLICATE DATA
    it('Should register duplicate user', async () => {
      const registerData: AuthDTORegister = {
        userName: 'newUser',
        email: 'newuser@example.com',
        password: '123',
        fullName: 'New User',
      };

      const response = await requestAgent
        .post('/auth/register')
        .send(registerData)
        .expect(500);

      const { body } = response;

      commonExpectFunction(body, 'statusCode', 500);
      commonExpectFunction(body, 'message', 'Internal Server Error');
    });

    //REGISTER WITH INVALID EMAIL
    it('Should return 400 for invalid email format', async () => {
      const registerData = {
        email: 'invalid-email',
        password: 'securePassword123',
        fullName: 'Test User',
        userName: 'testuser',
      };

      const response = await requestAgent
        .post('/auth/register')
        .send(registerData)
        .expect(400);

      const { body } = response;
      expect(body).toHaveProperty('statusCode', 400);
      expect(body.message).toContain('email must be an email');
    });
  });

  describe('POST /auth/login', () => {
    //LOGIN USERNAME SUCCESSFULLY
    it('/auth/login (POST) - should login a user with username successfully', async () => {
      const response = await requestAgent
        .post('/auth/login')
        .send({
          userName: 'newUser',
          password: '123',
        })
        .expect(201);

      const { body } = response;

      expect(body).toHaveProperty('statusCode', 200);
      expect(body).toHaveProperty('error', null);
      expect(body).toHaveProperty('success', true);
      expect(body).toHaveProperty('accessToken');
      expect(body.data).toHaveProperty('user');
    });

    //lOGIN EMAIL SUCCESSFULLY
    it('/auth/login (POST) - should login a user with email successfully', async () => {
      const loginData = {
        email: 'newuser@example.com',
        password: '123',
      };

      const response = await requestAgent
        .post('/auth/login')
        .send(loginData)
        .expect(201);

      const { body } = response;

      expect(body).toHaveProperty('statusCode', 200);
      expect(body).toHaveProperty('error', null);
      expect(body).toHaveProperty('success', true);
      expect(body).toHaveProperty('accessToken');
      expect(body.data).toHaveProperty('user');
    });

    //LOGIN WITH MISSING WRONG USERNAME
    it('/auth/login (POST) - should login a user with wrong username', async () => {
      const loginData = {
        userName: 'thachdinhOK',
        password: '123',
      };

      const response = await requestAgent
        .post('/auth/login')
        .send(loginData)
        .expect(401);

      const { body } = response;

      expect(body).toHaveProperty('statusCode', 401);
    });

    //LOGIN WITH MISSING WRONG PASSWORD
    it('/auth/login (POST) - should login a user with password wrong failed', async () => {
      const loginData = {
        email: 'thachdinh@gmail.com',
        password: '1234',
      };

      const response = await requestAgent
        .post('/auth/login')
        .send(loginData)
        .expect(401);

      const { body } = response;

      // Kiểm tra cấu trúc dữ liệu trả về
      expect(body).toHaveProperty('statusCode', 401);
    });
  });

  describe('POST /auth/logout', () => {
    //LOGOUT
    it('Should logout successfully', async () => {
      const response = await requestAgent.post('/auth/logout').expect(201);

      expect(response.body).toEqual({
        success: true,
        statusCode: 200,
        data: {
          message: 'Logout success!',
        },
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
