const endpointsJson = require("../endpoints.json")
const request = require('supertest')
const app = require('../api/app')
const db = require('../db/connection')
const data = require('../db/data/test-data/index')
const seed = require('../db/seeds/seed')
beforeEach(() => seed(data))
afterAll(() => db.end())

describe("GET: /api tests:", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});
describe('/api/topics tests:', () => {
  test('GET 200: Responds with array of topic objects', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics).toEqual(data.topicData)
      })
  })
  test('GET 200: Responds with topic objects that contain "slug" and "description" keys', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics[0]).toHaveProperty('slug')
        expect(topics[0]).toHaveProperty('description')
      })
  })
})