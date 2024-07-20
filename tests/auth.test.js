const request = require("supertest");
const httpStatus = require("http-status");

const app = require("../src/app");
const setupTestDB = require("./setupTestDB");
const { seedDb } = require("../src/utils");

jest.setTimeout(30000);

setupTestDB();
seedDb();

describe("Auth routes", () => {
  describe("POST /api/v1/auth/login", () => {
    const admin = {
      email: "admin@example.com",
      password: "superadminpassword99",
    };

    it("should return 200", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: admin.email, password: admin.password })
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("expires");
    });

    it("should return 401", async () => {
      await request(app)
        .post("/api/v1/auth/login")
        .send({ email: admin.email, password: "wrongpassword" })
        .expect(httpStatus.UNAUTHORIZED);
    });
  });
});
