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
