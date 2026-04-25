import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@angular/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // ← beforeAll au lieu de beforeEach
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close(); // ← ferme proprement l'app
  });

  it('/ (GET) should return 200', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });
});
