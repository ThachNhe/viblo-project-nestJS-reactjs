import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp } from './utils/test.utils';
import { FileUploadDbPrepareUtil } from './utils/file-upload-db-prepare.utils';
import axios from 'axios';

describe('FileUpload Module (e2e)', () => {
  let app: INestApplication;
  let requestAgent: any;
  let cookie: string;
  let userId: number;

  beforeAll(async () => {
    const { app: testApp } = await createTestApp([FileUploadDbPrepareUtil]);
    app = testApp;

    const commentDbPrepareUtil = app.get(FileUploadDbPrepareUtil);
    await commentDbPrepareUtil.prepare();

    requestAgent = request(app.getHttpServer());

    //login
    const res = await requestAgent
      .post('/auth/login')
      .send({ email: 'dieuvy@gmail.com', password: '123' });
    userId = res.body.data.user.id;
    cookie = res.headers['set-cookie'];
  });

  describe('PUT /minio/presigned-url', () => {
    //1. Presigned URL is generated unsuccessfully because of missing token
    it('1. Presigned URL is generated unsuccessfully because of missing token', async () => {
      const res = await requestAgent
        .put('/minio/presigned-url')
        .send({ fileName: 'test.jpg' });

      expect(res.status).toBe(401);
      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 2. Presigned URL is unsuccessfully generated because of invalid token
    it('2. Presigned URL is unsuccessfully generated because of invalid token', async () => {
      const res = await requestAgent
        .put('/minio/presigned-url')
        .set('cookie', 'invalidToken')
        .expect(401);

      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 3. Presigned URL is generated unsuccessfully because of missing fileName
    it('3. Presigned URL is generated unsuccessfully because of missing fileName', async () => {
      const emptyFileName = '';
      const res = await requestAgent
        .put(`/minio/presigned-url?fileName=${emptyFileName}`)
        .set('Cookie', cookie);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        message: ['fileName should not be empty'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    //4. Presigned URL is generated successfully
    it('4. Presigned URL is generated successfully', async () => {
      const fileName = 'testfile.txt';
      const res = await requestAgent
        .put(`/minio/presigned-url?fileName=${fileName}`)
        .set('Cookie', cookie)
        .expect(200);
      expect(res.body.presignedURL).toMatch(/^https?:\/\/.*$/);

      const file = new Blob(['This is a test file'], { type: 'text/plain' });
      const uploadResponse = await axios.put(res.body.presignedURL, file);
      expect(uploadResponse.status).toBe(200);
    });
  });

  describe('GET /minio/presigned-get-url', () => {
    // 1. Get URL unsuccessfully because of missing token
    it('1. Should return 401 because of missing token', async () => {
      const res = await requestAgent
        .get('/minio/presigned-get-url')
        .expect(401);
      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 2. Get URL unsuccessfully because of invalid token
    it('2. Should return 401 because of invalid token', async () => {
      const invalidToken = 'invalidToken';
      const res = await requestAgent
        .get('/minio/presigned-get-url')
        .set('Cookie', `${invalidToken}`)
        .expect(401);

      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 3. Get URL successfully
    it('3. Should return 200 and imageURL', async () => {
      const fileName = 'testfile.txt';

      const getUrlResponse = await request(app.getHttpServer())
        .get(`/minio/presigned-get-url?fileName=${fileName}`)
        .set('Cookie', cookie)
        .expect(200);

      expect(getUrlResponse.body.status).toBe('success');
      expect(getUrlResponse.body.imageURL).toMatch(/^https?:\/\/.*$/);
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
