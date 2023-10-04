const { describe, it, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { errorMessages } = require("../services/adminService");

describe("Get best profession", () => {
  const start = "2019-08-15T19:11:26.737Z";
  const end = "2021-08-15T19:11:26.737Z";
  it("should find Programmer as best profession", async () => {
    const response = await request(app)
      .get("/admin/best-profession")
      .set("profile_id", "1")
      .query({ start, end });
    expect(response.statusCode).toBe(200);
    expect(response.body.profession).toBe("Programmer");
    expect(response.body.totalEarnings).toBe(663);
  });
  it("should find Programmer as best profession", async () => {
    const response = await request(app)
      .get("/admin/best-profession")
      .set("profile_id", "1")
      .query({ start: end, end: start });
    expect(response.statusCode).toBe(400);
    expect(response.body.error.message).toBe(errorMessages.dateError);
  });
});
