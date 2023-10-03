const { describe, it, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");

describe("Get unpaid jobs", () => {
  it("should find unpaid jobs with prifile 1", async () => {
    const response = await request(app)
      .get("/jobs/unpaid")
      .set("profile_id", "1");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });
  it("should find unpaid jobs with prifile 2", async () => {
    const response = await request(app)
      .get("/jobs/unpaid")
      .set("profile_id", "2");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });
  it("should NOT find unpaid jobs with prifile 3", async () => {
    const response = await request(app)
      .get("/jobs/unpaid")
      .set("profile_id", "3");
    expect(response.statusCode).toBe(404);
  });
});
