const { describe, it, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");

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

describe("Pay for a job", () => {
  it("should succesfully pay for job with id 1", async () => {
    const response = await request(app)
      .post("/jobs/1/pay")
      .set("profile_id", "1");
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.paid).toBe(true);
  });
  it("should throw error when job is paid", async () => {
    const response = await request(app)
      .post("/jobs/1/pay")
      .set("profile_id", "1");
    expect(response.statusCode).toBe(400);
  });
  it("should NOT found jobs from other clients", async () => {
    const response = await request(app)
      .post("/jobs/1/pay")
      .set("profile_id", "2");
    expect(response.statusCode).toBe(404);
  });
  it("should throw error when no fonds", async () => {
    const response = await request(app)
      .post("/jobs/5/pay")
      .set("profile_id", "4");
    expect(response.statusCode).toBe(402);
  });
});
