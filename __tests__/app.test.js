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
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article.article_id).toBe(1)
        expect(article).toHaveProperty('title')
        expect(article).toHaveProperty('topic')
        expect(article).toHaveProperty('author')
        expect(article).toHaveProperty('body')
        expect(article).toHaveProperty('created_at')
        expect(article).toHaveProperty('votes')
        expect(article).toHaveProperty('article_img_url')
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
      .send({ username: 'icellusedkars' })
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
describe('PATCH /api/articles/:article_id tests:', () => {
  test('PATCH 200: Responds with article and increased votes', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes: 25 })
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 125,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        })
      })
  })
  test('PATCH 200: Responds with article and decreased votes', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes: -25 })
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 75,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        })
      })
  })
  test('PATCH 404: Responds with "Article not found" message for non-exisiting articles', () => {
    return request(app)
      .patch('/api/articles/103030')
      .send({ inc_votes: 25 })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual('Article not found')
      })
  })
  test('PATCH 400: Responds with "Bad request" message for unacceptable or missing key', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes: 'twenty-five' })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual('Bad request')
        return request(app)
          .patch('/api/articles/1')
          .send({ my_key: 'hello' })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toEqual('Bad request')
          })
      })
  })
})
describe('DELETE /api/comments/:comment_id tests:', () => {
  test('DELETE 404: Responds with "Comment not found" message for non-existing comment', () => {
    return request(app)
      .delete('/api/comments/103030')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Comment not found')
      })
  })
  test('DELETE 204: Removes a comment from DB', () => {
    return request(app)
      .delete('/api/comments/1')
      .expect(204)
      .then(() => {
        return request(app)
          .delete('/api/comments/1')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Comment not found')
          })
      })
  })
  test('DELETE 400: Responds with "Bad request" message for invalid comment id', () => {
    return request(app)
      .delete('/api/comments/banana')
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Bad request')
      })
  })
})
describe('/api/users tests:', () => {
  test('GET 200: Responds with an array all users and required keys in object', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users.length).toBe(4)
        users.forEach((user) => {
          expect(user).toHaveProperty('username')
          expect(user).toHaveProperty('name')
          expect(user).toHaveProperty('avatar_url')
        })
      })
  })
})
describe('GET BY QUERY /api/articles tests:', () => {
  test('GET 200: Responds with article objects sorted by comment_count date DESC', () => {
    return request(app)
      .get('/api/articles?sort_by=comment_count')
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSorted({ coerce: true, descending: true, key: 'comment_count' })
      })
  })
  test('GET 200: Responds with article objects sorted by comment_count date ASC', () => {
    return request(app)
      .get('/api/articles?sort_by=comment_count&order=ASC')
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSorted({ coerce: true, ascending: true, key: 'comment_count' })
      })
  })
  test('GET 200: Responds with sorted article objects and case insensitive', () => {
    return request(app)
      .get('/api/articles?sort_by=article_id&order=asc')
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSorted({ coerce: true, ascending: true, key: 'article_id' })
      })
  })
  test('GET 400: Responds with "Bad request" message for invalid sort_by query', () => {
    return request(app)
      .get('/api/articles?sort_by=banana')
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Bad request')
      })
  })
  test('GET 400: Responds with "Bad request" message for invalid order query', () => {
    return request(app)
      .get('/api/articles?sort_by=article_id&order=azs')
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Bad request')
      })
  })
})
describe('GET BY TOPIC /api/articles tests:', () => {
  test('GET 200: Responds with article objects from a specific topic and sorted by comments count', () => {
    return request(app)
      .get('/api/articles?sort_by=comment_count&topic=cats')
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSorted({ coerce: true, descending: true, key: 'comment_count' })
        expect(articles.length).toBeGreaterThan(0)
        articles.forEach((article) => {
          expect(article.topic).toBe('cats')
        })
      })
  })
  test('GET 200: Responds with an array containing all article objects from any topic if topic was not specified LIMIT 10', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBe(10)
      })
  })
  test('GET 404: Responds with "No articles found" message for non-existing topic query', () => {
    return request(app)
      .get('/api/articles?topic=banana')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('No artciles found for a requested topic')
      })
  })
})
describe('GET /api/articles/:article_id + comment_count', () => {
  test('GET 200: Returns an article with correct data and comment count', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article.article_id).toEqual(1)
        expect(article).toHaveProperty('title')
        expect(article).toHaveProperty('topic')
        expect(article).toHaveProperty('author')
        expect(article).toHaveProperty('body')
        expect(article).toHaveProperty('created_at')
        expect(article).toHaveProperty('votes')
        expect(article).toHaveProperty('article_img_url')
        expect(article.comment_count).toEqual('11')
      })
  })
})
describe('GET /api/users/:username tests:', () => {
  test('GET 200: Returns a user with correct username and properties', () => {
    return request(app)
      .get('/api/users/butter_bridge')
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user.username).toBe('butter_bridge')
        expect(user).toHaveProperty('name')
        expect(user).toHaveProperty('avatar_url')
      })
  })
  test('GET 404: Returns a "User not found" message when user with such username does not exist', () => {
    return request(app)
      .get('/api/users/maxkly')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('User not found')
      })
  })
})
describe('PATCH /api/comments/:comment_id tests:', () => {
  test('PATCH 200: Responds with comment and increased votes', () => {
    return request(app)
      .patch('/api/comments/1')
      .send({ inc_votes: 25 })
      .expect(200)
      .then(({ body: { comment } }) => {
        expect(comment).toEqual({
          comment_id: 1,
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          votes: 41,
          author: "butter_bridge",
          article_id: 9,
          created_at: '2020-04-06T12:17:00.000Z',
        })
      })
  })
  test('PATCH 200: Responds with comment and decreased votes', () => {
    return request(app)
      .patch('/api/comments/1')
      .send({ inc_votes: -10 })
      .expect(200)
      .then(({ body: { comment } }) => {
        expect(comment).toEqual({
          comment_id: 1,
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          votes: 6,
          author: "butter_bridge",
          article_id: 9,
          created_at: '2020-04-06T12:17:00.000Z',
        })
      })
  })
  test('PATCH 404: Responds with "Comment not found" message for non-exisiting comment', () => {
    return request(app)
      .patch('/api/comments/103030')
      .send({ inc_votes: 25 })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual('Comment not found')
      })
  })
  test('PATCH 400: Responds with "Bad request" message for unacceptable or missing key', () => {
    return request(app)
      .patch('/api/comments/1')
      .send({ inc_votes: 'twenty-five' })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual('Bad request')
        return request(app)
          .patch('/api/articles/1')
          .send({ my_key: 'hello' })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toEqual('Bad request')
          })
      })
  })
})
describe('POST /api/articles tests:', () => {
  test('POST 201: Responds with recently added article', () => {
    return request(app)
      .post('/api/articles')
      .send({ author: 'butter_bridge', title: 'Routing', body: 'Today we will learn more about routing', topic: 'mitch', article_img_url: 'https://media.licdn.com/dms/image/D4E12AQEBg943ptCYpg/article-cover_image-shrink_720_1280/0/1686391647921?e=2147483647&v=beta&t=sTfwUvcIfW7Fuby7hMluDfuRJK3HfYMMWc2SyZR7-GA' })
      .expect(201)
      .then(({ body: { article } }) => {
        expect(article.author).toBe('butter_bridge')
        expect(article.title).toBe('Routing')
        expect(article.body).toBe('Today we will learn more about routing')
        expect(article.topic).toBe('mitch')
        expect(article.article_img_url).toBe('https://media.licdn.com/dms/image/D4E12AQEBg943ptCYpg/article-cover_image-shrink_720_1280/0/1686391647921?e=2147483647&v=beta&t=sTfwUvcIfW7Fuby7hMluDfuRJK3HfYMMWc2SyZR7-GA')
        expect(article.votes).toBe(0)
        expect(article.comment_count).toBe("0")
        expect(article).toHaveProperty('article_id')
        expect(article).toHaveProperty('created_at')
      })
  })
  test('POST 201: Responds with new article and sets default image if not provided', () => {
    return request(app)
      .post('/api/articles')
      .send({ author: 'butter_bridge', title: 'Routing', body: 'Today we will learn more about routing', topic: 'mitch' })
      .expect(201)
      .then(({ body: { article } }) => {
        expect(article.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700')
      })
  })
  describe('POST 400: Responds with error message if any of required fields are missing', () => {
    test('POST 400 for missing author', () => {
      return request(app)
        .post('/api/articles')
        .send({ title: 'Routing', body: 'Today we will learn more about routing', topic: 'mitch' })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Bad request, required fields are missing')
        })
    })
    test('POST 400 for missing title', () => {
      return request(app)
        .post('/api/articles')
        .send({ author: 'butter_bridge', body: 'Today we will learn more about routing', topic: 'mitch' })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Bad request, required fields are missing')
        })
    })
    test('POST 400 for missing body', () => {
      return request(app)
        .post('/api/articles')
        .send({ author: 'butter_bridge', title: 'Routing', topic: 'mitch' })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Bad request, required fields are missing')
        })
    })
    test('POST 400 for missing topic', () => {
      return request(app)
        .post('/api/articles')
        .send({ author: 'butter_bridge', title: 'Routing', body: 'Today we will learn more about routing' })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Bad request, required fields are missing')
        })
    })
  })
})
describe('Pagination GET /api/articles test:', () => {
  test('GET 200: Responds with articles 0-10 for default limit & first page', () => {
    return request(app)
      .get('/api/articles?page=1&sort_by=article_id&order=asc')
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBe(10)
        expect(articles[9].title).toBe('Seven inspirational thought leaders from Manchester UK')
      })
  })
  test('GET 200: Responds with articles 11-13 for default limit & second page', () => {
    return request(app)
      .get('/api/articles?page=2&sort_by=article_id&order=asc')
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBe(3)
        expect(articles[0].title).toBe('Am I a cat?')
      })
  })
  test('GET 200: Responds with articles 0-15 for limit = 15 & page 1', () => {
    return request(app)
      .get('/api/articles??page=1&limit=15&sort_by=article_id&order=asc')
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBe(13)
        expect(articles[12].title).toBe('Another article about Mitch')
      })
  })
  test('GET 400: Responds with "Bad request" message if invalid query was provided', () => {
    return request(app)
      .get('/api/articles?page=eleven')
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Bad request')
      })
  })
  test('GET 404: Responds with "No content: Search constraints are out of range"', () => {
    return request(app)
      .get('/api/articles?page=300')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('No content: Search constraints are out of range')
      })
  })
})