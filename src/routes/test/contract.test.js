const { describe, it, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");

describe("Get Contract by id", () => {
  it("should find the contract with id 1 and profile 1", async () => {
    const response = await request(app)
      .get("/contracts/1")
      .set("profile_id", "1");
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.ClientId).toBe(1);
  });

  it("should find the contract with id 2 and profile 1", async () => {
    const response = await request(app)
      .get("/contracts/2")
      .set("profile_id", "1");
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(2);
    expect(response.body.ClientId).toBe(1);
  });

  it("should NOT find the contract with id 3 and profile 1", async () => {
    const response = await request(app)
      .get("/contracts/3")
      .set("profile_id", "1");
    expect(response.statusCode).toBe(404);
  });
});

describe("Get Contracts", () => {
  it("should find 1 contract with profile 1", async () => {
    const response = await request(app)
      .get("/contracts")
      .set("profile_id", "1");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it("should find 2 contracts with profile 2", async () => {
    const response = await request(app)
      .get("/contracts")
      .set("profile_id", "2");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("should NOT find contracts with profile 5 (Undefined)", async () => {
    const response = await request(app)
      .get("/contracts")
      .set("profile_id", "5");
    expect(response.statusCode).toBe(404);
  });
});
