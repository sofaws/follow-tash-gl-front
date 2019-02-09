const request = require("supertest");
const server = require("../api.js");

describe("basic route tests", () => {
  beforeAll(async () => {
    console.log("Jest starting!");
  });

  afterAll(() => {
    server.close();
    console.log("server closed!");
  });

  test("get home route GET /", async () => {
    const response = await request(server).get("/tesks");
    expect(response.status).toEqual(200);
    // expect(response.text).toContain("Hello World!");
  });
});
