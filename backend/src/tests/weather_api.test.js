const supertest = require('supertest');
const { test, describe, expect } = require('jest');
const app = require('../app');

const apptest = supertest(app.callback());

describe('test get weather api', () => {
  test('weathers are returned as json', async () => {
    await apptest.get('/api/weather')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('a specific weather will return base on latitute and longitute', async () => {
    const lat = '5.285153';
    const lon = '100.456238';
    const response = await apptest
      .get('/api/weather')
      .query({
        latitude: lat,
        longitude: lon
      })
      .set('accept', 'application/json')
      .expect(200);

    expect(response.status).toEqual(200);
    expect(response.body).not.toHaveProperty(['kitchen', 'mei']);
  });
});

describe('test forecast api', () => {
  test('forecast result is returned as json', async () => {
    await apptest.get('/api/forecast')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('a specific weather forecast will return base on latitute and longitute', async () => {
    const lat = '5.285153';
    const lon = '100.456238';
    const response = await apptest
      .get('/api/forecast')
      .query({
        latitude: lat,
        longitude: lon
      })
      .set('accept', 'application/json')
      .expect(200);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(4);
  });
});
