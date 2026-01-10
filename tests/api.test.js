const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
  // If MONGO_URI is provided, connect to it; otherwise tests will still run for basic endpoints
  const uri = process.env.MONGO_URI;
  if (uri) {
    await mongoose.connect(uri);
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
});

describe('Basic API', () => {
  test('GET / should return running message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Task Manager API is running/);
  });
});
