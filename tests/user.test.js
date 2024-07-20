const request = require("supertest");
const httpStatus = require("http-status");

const app = require("../src/app");
const setupTestDB = require("./setupTestDB");
const { seedDb } = require("../src/utils");
const { generateAuthTokens } = require("../src/services/auth");
const { UserRepository } = require("../src/repositories");

jest.setTimeout(30000);

setupTestDB();
seedDb();

describe("User routes", () => {
  let adminToken;
  let user;

  beforeAll(async () => {
    const admin = {
      email: "admin@example.com",
      password: "superadminpassword99",
    };

    const tokens = await generateAuthTokens(admin);
    adminToken = tokens.token;

    user = await UserRepository.create({
      email: "testuser@example.com",
      password: "password123",
      firstname: "Test",
      lastname: "User",
    });
  });

  afterAll(async () => {
    const foundUser = await UserRepository.findByEmail("testuser@example.com");
    await UserRepository.deleteById(foundUser._id);
  });

  describe("GET /api/v1/users", () => {
    it("should return 200 and all users", async () => {
      const res = await request(app)
        .get("/api/v1/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe("POST /api/v1/users", () => {
    it("should create a new user and return 201", async () => {
      const newUser = {
        email: "newuser@example.com",
        password: "password123",
        firstname: "New",
        lastname: "User",
      };

      const res = await request(app)
        .post("/api/v1/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body).toHaveProperty("id");
      expect(res.body.email).toBe(newUser.email);

      await UserRepository.deleteById(res.body.id);
    });
  });

  describe("GET /api/v1/users/:id", () => {
    it("should return a user by ID", async () => {
      const res = await request(app)
        .get(`/api/v1/users/${user.id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(httpStatus.OK);

      expect(res.body.email).toBe(user.email);
    });
  });

  describe("PUT /api/v1/users/:id", () => {
    it("should update a user and return 200", async () => {
      const updateData = { firstname: "Updated" };

      const res = await request(app)
        .put(`/api/v1/users/${user.id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updateData)
        .expect(httpStatus.OK);

      expect(res.body.firstname).toBe(updateData.firstname);
    });
  });

  describe("DELETE /api/v1/users/:id", () => {
    it("should delete a user and return 200", async () => {
      const newUser = await UserRepository.create({
        email: "deleteuser@example.com",
        password: "password123",
        firstname: "Delete",
        lastname: "User",
      });

      await request(app)
        .delete(`/api/v1/users/${newUser.id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(httpStatus.OK);

      const userInDb = await UserRepository.findById(newUser.id);
      expect(userInDb).toBeNull();
    });
  });
});
