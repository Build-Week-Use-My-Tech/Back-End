// require("dotenv").config();
const request = require("supertest");
const server = require("../api/server");
const knex = require("../data/db-config");

describe("Registering a User", () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  it("should return 400 status code due to empty registration field values", async () => {
    const result = await request(server)
      .post("/api/auth/register")
      .send({
        first_name: "",
        last_name: "",
        email: "test@test99999.com",
        password: "password"
      });
    expect(result.status).toBe(400);
  });

  it("should successfully register a user and return a 201 status code", async () => {
    const result = await request(server)
      .post("/api/auth/register")
      .send({
        first_name: "John",
        last_name: "Doe",
        email: "john@doe.com",
        password: "password",
        renter: true,
        owner: false
      });
    expect(result.status).toBe(201);
  });
});

describe("Logging in a User", () => {
  it("should unsuccessfully try to login the user, receive status code 401 and no JWT token", async () => {
    const result = await request(server)
      .post("/api/auth/login")
      .send({
        email: "john@doe.com",
        password: "passwor"
      });

    const regex = /\s\S/;
    const token = {
      // match property token with any string value
      token: regex
    };
    expect(result.status).toBe(401);
    expect(result.body).not.toMatchObject(token);
  });

  it("should succesfully login the user, receive status code 200 and receive a JWT token back", async () => {
    const result = await request(server)
      .post("/api/auth/login")
      .send({
        email: "john@doe.com",
        password: "password"
      });

    const regex = /\s\S/;
    const token = {
      // match property token with any string value
      token: regex
    };
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(token);
  });
});
