import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp } from './utils/test.utils';
import { AuthDbPrepareUtil } from './utils/auth-db-prepare.util';

describe('Auth Module (e2e)', () => {
  let app: INestApplication;
  let requestAgent: any;
  let token: string;
  const registerData = {
    email: 'thachdinh10@gmail.com',
    userName: 'thachdinh10',
    fullName: 'Dinh van thach',
    password: '123',
  };

  beforeAll(async () => {
    const { app: testApp } = await createTestApp([AuthDbPrepareUtil]);
    app = testApp;

    const authDbPrepareUtil = app.get(AuthDbPrepareUtil);

    authDbPrepareUtil.prepare();
    requestAgent = request(app.getHttpServer());

    const loginResponse = await requestAgent
      .post('/auth/login')
      .send({ email: 'newuser@example.com', password: '123' });
    token = loginResponse.body.accessToken;
  });

  let commonExpectFunction = (body: any, key: any, value: any) => {
    expect(body).toHaveProperty(key, value);
  };

  describe('POST /auth/register', () => {
    //REGISTER SUCCESSFULLY
    it('1. Should register a user successfully', async () => {
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
    it('2. should return error when data is missing', async () => {
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
    it('3. Should register duplicate user', async () => {
      const registerData = {
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
    it('4. Should return 400 for invalid email format', async () => {
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
    it('5. Should login a user with username successfully', async () => {
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
    it('6. Should login a user with email successfully', async () => {
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
    it('7. should login a user with wrong username', async () => {
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
    it('8. Should login a user with password wrong failed', async () => {
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
    it('1. Should logout successfully', async () => {
      const response = await requestAgent
        .post('/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

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
