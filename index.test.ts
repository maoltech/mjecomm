import request from 'supertest';
import express, { Express } from 'express';
import { routes } from './router/index.router';
import { databaseConfig } from './config/database.config';

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/v1', routes.router);

jest.mock('../config/database.config', () => ({
  databaseConfig: {
    mongodbConnection: jest.fn()
  }
}));

describe('Express App', () => {
  beforeAll(() => {
    // Call mongodbConnection() before running tests
    databaseConfig.mongodbConnection();
  });

  it('should respond with status 200 for GET request to /api/v1', async () => {
    const response = await request(app).get('/api/v1');
    expect(response.status).toBe(200);
  });

});
