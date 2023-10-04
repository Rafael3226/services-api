const { describe, it, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { errorMessages } = require("../services/adminService");

const start = "2019-08-15T19:11:26.737Z";
const end = "2021-08-15T19:11:26.737Z";

describe("Get best profession", () => {
  const uri = "/admin/best-profession";
  it("should find Programmer as best profession", async () => {
    const response = await request(app)
      .get(uri)
      .set("profile_id", "1")
      .query({ start, end });
    expect(response.statusCode).toBe(200);
    expect(response.body.profession).toBe("Programmer");
    expect(response.body.totalEarnings).toBe(663);
  });
  it("should find Programmer as best profession", async () => {
    const response = await request(app)
      .get(uri)
      .set("profile_id", "1")
      .query({ start: end, end: start });
    expect(response.statusCode).toBe(400);
    expect(response.body.error.message).toBe(errorMessages.dateError);
  });
});

describe("Get best clients", () => {
  const uri = "/admin/best-clients";
  it("should find 2 (default) best clients", async () => {
    const response = await request(app)
      .get(uri)
      .set("profile_id", "1")
      .query({ start, end });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });
  it("should be sorted DESC", async () => {
    const response = await request(app)
      .get(uri)
      .set("profile_id", "1")
      .query({ start, end });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].totalSpends).toBeGreaterThan(
      response.body[1].totalSpends
    );
  });
  it("should find 3 best clients", async () => {
    const response = await request(app)
      .get(uri)
      .set("profile_id", "1")
      .query({ start, end, limit: 3 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
  });
  it("should throw a date error", async () => {
    const response = await request(app)
      .get(uri)
      .set("profile_id", "1")
      .query({ start: end, end: start });
    expect(response.statusCode).toBe(400);
    expect(response.body.error.message).toBe(errorMessages.dateError);
  });
});
