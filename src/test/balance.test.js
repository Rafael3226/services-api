const { describe, it, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { errorMessages } = require("../services/balanceService");

describe("Deposit money", () => {
  it("should deposit money", async () => {
    const response = await request(app)
      .post("/balances/deposit/1")
      .set("profile_id", "1")
      .send({ amount: 100 });
    expect(response.statusCode).toBe(200);
  });
  it("should not deposit money (Amount over the limit)", async () => {
    const response = await request(app)
      .post("/balances/deposit/1")
      .set("profile_id", "1")
      .send({ amount: 200 });
    expect(response.statusCode).toBe(400);
    expect(response.body.error.message).toBe(errorMessages.amountOverLimint);
  });
  it("should not deposit money (Amount not negative)", async () => {
    const response = await request(app)
      .post("/balances/deposit/1")
      .set("profile_id", "1")
      .send({ amount: 0 });
    expect(response.statusCode).toBe(400);
    expect(response.body.error.message).toBe(errorMessages.amountNotNegative);
  });
  it("should not deposit money (Not unpaid jobs)", async () => {
    const response = await request(app)
      .post("/balances/deposit/5")
      .set("profile_id", "1")
      .send({ amount: 200 });
    expect(response.statusCode).toBe(400);
    expect(response.body.error.message).toBe(errorMessages.notUnpaidJobs);
  });
});
