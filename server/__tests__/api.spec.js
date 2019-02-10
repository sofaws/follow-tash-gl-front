const request = require("supertest");
const server = require("../api.js");

describe("basic route tests", () => {
  afterAll(() => {
    server.close();
  });

  test("the route GET /tasks", async () => {
    const response = await request(server).get("/tasks");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
});
