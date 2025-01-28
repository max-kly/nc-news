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
  test('GET 404: Returns a "Article not found" message when article with such id does not exist', () => {
    return request(app)
      .get('/api/articles/94949')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Article not found')
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
describe('/api/articles tests:', () => {
  test('GET 200: Responds with array of article objects', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBeGreaterThan(0)
      })
  })
  test('GET 200: Responds with article objects that contain appropriate keys', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBeGreaterThan(0)
        articles.forEach((article) => {
          expect(article).toHaveProperty('author')
          expect(article).toHaveProperty('title')
          expect(article).toHaveProperty('article_id')
          expect(article).toHaveProperty('topic')
          expect(article).toHaveProperty('created_at')
          expect(article).toHaveProperty('votes')
          expect(article).toHaveProperty('article_img_url')
          expect(article).toHaveProperty('comment_count')
        })
      })
  })
  test('GET 200: Responds with article objects sorted by created_at date DESC', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSorted({ coerce: true, descending: true, key: 'created_at' })
      })
  })
})
describe('/api/articles/:article_id/comments tests:', () => {
  test('GET 200: Responds with array of comments for given article', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments.length).toBe(11)
      })
  })
  test('GET 200: Responds with array of comment objects that contain required properties', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments.length).toBeGreaterThan(0)
        comments.forEach((comment) => {
          expect(comment).toHaveProperty('comment_id')
          expect(comment).toHaveProperty('body')
          expect(comment).toHaveProperty('votes')
          expect(comment).toHaveProperty('author')
          expect(comment).toHaveProperty('article_id')
          expect(comment).toHaveProperty('created_at')
        })
      })
  })
  test('GET 200: Respons witn array of comments sorted by created_at DESC', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toBeSorted({ coerce: true, descending: true, key: 'created_at' })
      })
  })
  test('GET 404: Responds with "Article not found" message when article does not exist', () => {
    return request(app)
      .get('/api/articles/200/comments')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Article not found')
      })
  })
  test('GET 200: Responds with empty array for article without comments', () => {
    return request(app)
      .get('/api/articles/2/comments')
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toEqual([])
      })
  })
  test('GET 400: Responds with "Bad request" for invalid article param', () => {
    return request(app)
      .get('/api/articles/m/comments')
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Bad request')
      })
  })
  test('POST 201: Responds with an object of added comment after successful post', () => {
    return request(app)
      .post('/api/articles/1/comments')
      .send({ username: 'icellusedkars', body: 'Saved to read later, thx!' })
      .expect(201)
      .then(({ body: { comment } }) => {
        expect(comment.comment_id).toEqual(19)
        expect(comment.body).toEqual('Saved to read later, thx!')
        expect(comment.votes).toEqual(0)
        expect(comment.author).toEqual('icellusedkars')
        expect(comment.article_id).toEqual(1)
      })
  })
  test('POST 400: Responds with a "Bad request" message for invalid article id', () => {
    return request(app)
      .post('/api/articles/article/comments')
      .send({ username: 'icellusedkars', body: 'Saved to read later, thx!' })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Bad request')
      })
  })
  test('POST 400: Responds with a "Bad request" message for invalid body/key', () => {
    return request(app)
      .post('/api/articles/1/comments')
      .send({ username: 'icellusedkars'})
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Bad request')
      })
  })
  test('POST 404: Responds with a "Article not found" message for non-existing article', () => {
    return request(app)
      .post('/api/articles/13893893/comments')
      .send({ username: 'icellusedkars', body: 'Saved to read later, thx!' })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Article not found')
      })
  })
  test('POST 400: Responds with a "User not found" message for non-existing username', () => {
    return request(app)
      .post('/api/articles/1/comments')
      .send({ username: 'maxkly', body: 'Saved to read later, thx!' })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Bad request')
      })
  })
})