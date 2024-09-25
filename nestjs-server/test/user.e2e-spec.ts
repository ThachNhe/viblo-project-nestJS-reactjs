import { se } from 'date-fns/locale';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp } from './utils/test.utils';
import { UserDbPrepareUtil } from './utils/user-db-prepare.util';
import * as argon2 from 'argon2';

describe('Auth Module (e2e)', () => {
  let app: INestApplication;
  let requestAgent: any;
  let adminToken: string;
  let userToken: string;
  let userId1: number;
  let userId2: number;

  beforeAll(async () => {
    const { app: testApp } = await createTestApp([UserDbPrepareUtil]);
    app = testApp;

    const userDbPrepareUtil = app.get(UserDbPrepareUtil);
    await userDbPrepareUtil.prepare();

    requestAgent = request(app.getHttpServer());

    const registerRes1 = await requestAgent.post('/auth/register').send({
      email: 'thachdinh10@gmail.com',
      userName: 'thachdinh10',
      fullName: 'Dinh van thach',
      password: await argon2.hash('123'),
    });

    const registerRes2 = await requestAgent.post('/auth/register').send({
      email: 'dieuvy@gmail.com',
      userName: 'dieuvy',
      fullName: 'Dieu Vy',
      password: await argon2.hash('123'),
    });

    userId1 = registerRes1.body.data.user.id;
    userId2 = registerRes2.body.data.user.id;

    const loginAdmin = await requestAgent
      .post('/auth/login')
      .send({ email: 'thachdinh@gmail.com', password: '123' });
    adminToken = loginAdmin.body.accessToken;

    const userLogin = await requestAgent
      .post('/auth/login')
      .send({ email: 'khanhtran@gmail.com', password: '123' });
    userToken = userLogin.body.accessToken;
  });

  describe('GET /user/:id', () => {
    // 1. Get user without adminToken
    it('1. Should get a user successfully', async () => {
      const res = await requestAgent.get(`/users/${userId1}`).expect(401);
      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 2. Get user successfully
    it('2. Should get a user successfully', async () => {
      const users = await requestAgent
        .get(`/users/${userId1}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(users.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: {
          id: userId1,
          email: 'thachdinh10@gmail.com',
          userName: 'thachdinh10',
          fullName: 'Dinh van thach',
          avatar: null,
          follower_number: 0,
          posts: [],
        },
      });
    });

    // 3. Get user not found
    it('3. Should get a user not found', async () => {
      const invalidUserId = 10000000000;
      const res = await requestAgent
        .get(`/users/${invalidUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
      expect(res.body).toEqual({
        message: 'User not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    // 4. Get user with invalid adminToken
    it('4. Should get a user with invalid adminToken', async () => {
      const res = await requestAgent
        .get(`/users/${userId1}`)
        .set('Authorization', `Bearer invalid_token`)
        .expect(401);
      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 5. Get user with id is less than 1
    it('5. Should get a user with id is less than 1', async () => {
      const res = await requestAgent
        .get(`/users/0`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);
      expect(res.body).toEqual({
        message: ['id must not be less than 1'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    // 6. Get user with id is not a number
    it('6. Should get a user with id is not a number', async () => {
      const res = await requestAgent
        .get(`/users/abc`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);
      expect(res.body).toEqual({
        message: [
          'id must not be less than 1',
          'id must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  describe('PUT /avatar', () => {
    // 1. without adminToken
    it('1. Should upload avatar unsuccessfully because of without adminToken', async () => {
      const imgURL = 'https://www.google.com';
      const res = await requestAgent
        .put('/users/avatar')
        .send({ avatar: imgURL })
        .expect(401);
      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 2. upload avatar successfully
    it('2. Should upload avatar successfully', async () => {
      const imgURL = 'https://www.google.com';
      const res = await requestAgent
        .put('/users/avatar')
        .send({ avatar: imgURL })
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: {
          id: expect.any(String),
          fullName: expect.any(String),
          userName: expect.any(String),
          email: expect.any(String),
          avatar: expect.any(String),
          posts: expect.any(Array),
          updated_at: expect.any(String),
        },
      });
    });

    // 3. upload avatar unsuccessfully because of invalid adminToken
    it('3. Should upload avatar unsuccessfully because of invalid adminToken', async () => {
      const imgURL = 'https://www.google.com';
      const res = await requestAgent
        .put('/users/avatar')
        .send({ avatar: imgURL })
        .set('Authorization', `Bearer invalid_token`)
        .expect(401);
      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 4. upload avatar unsuccessfully because of invalid URL
    it('4. Should upload avatar unsuccessfully because of invalid URL', async () => {
      const imgURL = 'abc';
      const res = await requestAgent
        .put('/users/avatar')
        .send({ avatar: imgURL })
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);
      expect(res.body).toEqual({
        message: ['avatar must be a URL address'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    // 5. upload avatar unsuccessfully because of empty URL
    it('5. Should upload avatar unsuccessfully because of empty URL', async () => {
      const imgURL = '';
      const res = await requestAgent
        .put('/users/avatar')
        .send({ avatar: imgURL })
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);
      expect(res.body).toEqual({
        message: ['avatar must be a URL address', 'avatar should not be empty'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  describe('Delete /users/:id', () => {
    // 1. delete user successfully
    it('1. Should delete user successfully', async () => {
      console.log('check userid', userId1);
      const res = await requestAgent
        .delete(`/users/${userId1}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(res.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: 'Delete user successfully',
      });
    });

    // 2. delete user unsuccessfully because of without adminToken
    it('2. Should delete user unsuccessfully because of without adminToken', async () => {
      const res = await requestAgent.delete(`/users/${userId1}`).expect(401);
      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 3. delete user unsuccessfully because of invalid adminToken
    it('3. Should delete user unsuccessfully because of invalid adminToken', async () => {
      const res = await requestAgent
        .delete(`/users/${userId1}`)
        .set('Authorization', `Bearer invalid_token`)
        .expect(401);
      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 4. delete user unsuccessfully because of user not found
    it('4. Should delete user unsuccessfully because of user not found', async () => {
      const invalidUserId = 10000000000;
      const res = await requestAgent
        .delete(`/users/${invalidUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
      expect(res.body).toEqual({
        message: 'User not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    // 5. delete user unsuccessfully because of id is less than 1
    it('5. Should delete user unsuccessfully because of id is less than 1', async () => {
      const res = await requestAgent
        .delete(`/users/0`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);
      expect(res.body).toEqual({
        message: ['id must not be less than 1'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    // 6. delete user unsuccessfully because of id is not a number
    it('6. Should delete user unsuccessfully because of id is not a number', async () => {
      const invalidUserId = 'abc';
      const res = await requestAgent
        .delete(`/users/${invalidUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);
      expect(res.body).toEqual({
        message: [
          'id must not be less than 1',
          'id must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    // delete user unsuccessfully because userId1 is empty
    it('7. Should delete user unsuccessfully because userId1 is empty', async () => {
      const res = await requestAgent
        .delete(`/users/`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
      expect(res.body).toEqual({
        message: 'Cannot DELETE /users/',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    //delete user unsuccessfully because user is not Admin
    it('8. Should delete user unsuccessfully because user is not Admin', async () => {
      const res = await requestAgent
        .delete(`/users/${userId1}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
      expect(res.body).toEqual({
        message: 'You do not have the required role',
        error: 'Forbidden',
        statusCode: 403,
      });
    });
  });

  describe('PUT /users/block/:id', () => {
    // 1. block user without adminToken
    it('1. Should block user unsuccessfully because of without adminToken', async () => {
      const res = await requestAgent.put(`/users/${userId1}/block`).expect(401);
      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 2. block user unsuccessfully because of invalid adminToken
    it('2. Should block user unsuccessfully because of invalid adminToken', async () => {
      const res = await requestAgent
        .put(`/users/${userId1}/block`)
        .set('Authorization', `Bearer invalid_token`)
        .expect(401);
      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 3. block user successfully
    it('3. Should block user successfully', async () => {
      const res = await requestAgent
        .put(`/users/${userId2}/block`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(res.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: 'Block user successfully',
      });
    });

    // 4. block user has already been blocked
    it('4. Should block user has already been blocked', async () => {
      const res = await requestAgent
        .put(`/users/${userId2}/block`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);
      expect(res.body).toEqual({
        message: 'User is already blocked',
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    // 5. block user unsuccessfully because of user not found
    it('5. Should block user unsuccessfully because of user not found', async () => {
      const invalidUserId = 10000000000;
      const res = await requestAgent
        .put(`/users/${invalidUserId}/block`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
      expect(res.body).toEqual({
        message: 'User not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    // 6. block user unsuccessfully because of id is less than 1
    it('6. Should block user unsuccessfully because of id is less than 1', async () => {
      const invalidUserId = 0;
      const res = await requestAgent
        .put(`/users/${invalidUserId}/block`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);
      expect(res.body).toEqual({
        message: ['id must not be less than 1'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    // 7. block user unsuccessfully because of id is not a number
    it('7. Should block user unsuccessfully because of id is not a number', async () => {
      const invalidUserId = 'abc';
      const res = await requestAgent
        .put(`/users/${invalidUserId}/block`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);
      expect(res.body).toEqual({
        message: [
          'id must not be less than 1',
          'id must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    // 8. block user unsuccessfully because userId1 is empty
    it('8. Should block user unsuccessfully because userId1 is empty', async () => {
      const res = await requestAgent
        .put(`/users/block`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
      expect(res.body).toEqual({
        message: 'Cannot PUT /users/block',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    // 9. block user unsuccessfully because user is not Admin
    it('9. Should block user unsuccessfully because user is not Admin', async () => {
      const res = await requestAgent
        .put(`/users/${userId1}/block`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
      expect(res.body).toEqual({
        message: 'You do not have the required role',
        error: 'Forbidden',
        statusCode: 403,
      });
    });
  });

  describe('PUT /users/unblock/:id', () => {
    // 1. unblock user without adminToken
    it('1. Should unblock user unsuccessfully because of without adminToken', async () => {
      const res = await requestAgent
        .put(`/users/${userId1}/unblock`)
        .expect(401);
      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 2. unblock user unsuccessfully because of invalid adminToken
    it('2. Should unblock user unsuccessfully because of invalid adminToken', async () => {
      const res = await requestAgent
        .put(`/users/${userId1}/unblock`)
        .set('Authorization', `Bearer invalid_token`)
        .expect(401);
      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 3. Unblock user successfully
    it('3. Should unblock user successfully', async () => {
      const res = await requestAgent
        .put(`/users/${userId2}/unblock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(res.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: 'Unblock user successfully',
      });
    });

    // 4. unblock user has already been unblocked
    it('4. Should unblock user has already been unblocked', async () => {
      const res = await requestAgent
        .put(`/users/${userId2}/unblock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);

      expect(res.body).toEqual({
        message: 'User is already unblocked',
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    // 5. unblock user unsuccessfully because of user not found
    it('5. Should unblock user unsuccessfully because of user not found', async () => {
      const invalidUserId = 10000000000;
      const res = await requestAgent
        .put(`/users/${invalidUserId}/unblock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
      expect(res.body).toEqual({
        message: 'User not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    // 6 unblock user unsuccessfully because user is not Admin
    it('6. Should unblock user unsuccessfully because user is not Admin', async () => {
      const res = await requestAgent
        .put(`/users/${userId1}/unblock`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      expect(res.body).toEqual({
        message: 'You do not have the required role',
        error: 'Forbidden',
        statusCode: 403,
      });
    });
  });

  describe('GET /users/top', () => {
    // 1. Get top users successfully
    it('1. Should get top users successfully', async () => {
      const page = 1,
        limit = 10;
      const res = await requestAgent
        .get(`/users/top?page=${page}&limit=${limit}`)
        .expect(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('statusCode', 200);
      expect(res.body).toHaveProperty('error', null);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('meta');
    });

    // 2. Get top users unsuccessfully because of invalid page
    it('2. Should get top users unsuccessfully because of invalid page', async () => {
      const page = -1,
        limit = 10;
      const res = await requestAgent
        .get(`/users/top?page=${page}&limit=${limit}`)
        .expect(400);
      expect(res.body).toEqual({
        message: ['page must not be less than 1'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    // 3. Get top users unsuccessfully because of invalid limit
    it('3. Should get top users unsuccessfully because of invalid limit', async () => {
      const page = 1,
        limit = -10;
      const res = await requestAgent
        .get(`/users/top?page=${page}&limit=${limit}`)
        .expect(400);
      expect(res.body).toEqual({
        message: ['limit must not be less than 1'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    // 4. Get top users unsuccessfully because of invalid page and limit
    it('4. Should get top users unsuccessfully because of invalid page and limit', async () => {
      const page = -1,
        limit = -10;
      const res = await requestAgent
        .get(`/users/top?page=${page}&limit=${limit}`)
        .expect(400);
      expect(res.body).toEqual({
        message: [
          'page must not be less than 1',
          'limit must not be less than 1',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
