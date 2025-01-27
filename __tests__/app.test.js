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
        expect(topics.length).toBeGreaterThan(0)
      })
  })
  test('GET 200: Responds with topic objects that contain "slug" and "description" keys', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body: { topics } }) => {
        topics.forEach((topic) => {
          expect(topic).toHaveProperty('slug')
          expect(topic).toHaveProperty('description')
        })
      })
  })
})
describe('/api/articles/:article_id tests:', () => {
  test('GET 200: Returns an article with correct id', () => {
    const output = {
      article_id: 1,
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: '2020-07-09T20:11:00.000Z',
      votes: 100,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
    }
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual(output)
      })
  })
  test('GET 404: Returns a "Not found" message when article with such id does not exist', () => {
    return request(app)
      .get('/api/articles/94949')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Not found')
      })
  })
  test('GET 400: Returns a "Bad request" message when passed invalid id', () => {
    return request(app)
      .get('/api/articles/myId')
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Bad request')
      })
  })
})