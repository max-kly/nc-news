const endpointsJson = require("../endpoints.json")
const request = require('supertest')
const app = require('../api/app')
const db = require('../db/connection')

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
