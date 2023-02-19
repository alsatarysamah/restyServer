"use strict";
require("dotenv").config();
process.env.SECRET = "TEST_SECRET";

const { db } = require("../src/models/index");
const supertest = require("supertest");
const server = require("../src/server").server;

const mockRequest = supertest(server);

let userData = {
  testUser: { username: "user@yahoo.com", password: "123456" },
};

const history = {
  url: "https://api.covid19api.com/summary",
  method: "put",
  userId: 1,
};
const updateHistory = {
  url: "https://api.covid19api.com/summary",
  method: "get",
  userId: 1,
};
let accessToken = null;

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe("Auth Router", () => {
  it("404", async () => {
    const response = await mockRequest.get("/sign");

    expect(response.status).toBe(404);
  });
  it("Can create a new user", async () => {
    const response = await mockRequest.post("/signup").send(userData.testUser);
    const userObject = response.body;

    expect(response.status).toBe(201);
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(userData.testUser.username);
  });

  it("Can signin with basic auth string", async () => {
    let { username, password } = userData.testUser;

    const response = await mockRequest.post("/signin").auth(username, password);
    accessToken = response.body.user.token;

    const userObject = response.body;
    expect(response.status).toBe(200);
    expect(userObject.user.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(username);
  });

  it("Can signin with bearer auth token", async () => {
    const bearerResponse = await mockRequest
      .get("/history")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(bearerResponse.status).toBe(200);
  });

  it("basic fails with known user and wrong password ", async () => {
    const response = await mockRequest.post("/signin").auth("user@yahoo.com", "xyz");
    const { user, token } = response.body;

    expect(response.status).toBe(403);
    expect(response.text).toEqual("Invalid Login");
    expect(user).not.toBeDefined();
    expect(token).not.toBeDefined();
  });

  it("basic fails with unknown user", async () => {
    const response = await mockRequest.post("/signin").auth("nobody", "xyz");
    const { user, token } = response.body;

    expect(response.status).toBe(403);
    expect(response.text).toEqual("Invalid Login");
    expect(user).not.toBeDefined();
    expect(token).not.toBeDefined();
  });

  it("bearer fails with an invalid token", async () => {
    const response = await mockRequest
      .get("/history")
      .set("Authorization", `Bearer foobar`);
    const userList = response.body;

    expect(response.status).toBe(403);
    expect(response.text).toEqual("Invalid Login");
    expect(userList.length).toBeFalsy();
  });

  it("Succeeds with a valid token", async () => {
    const response = await mockRequest
      .get("/history")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body).toEqual(expect.anything());
  });
  
  it("Home route", async () => {
    const bearerResponse = await mockRequest
      .get("/")
      .set("Authorization", `Bearer ${accessToken}`);

    const userObject = bearerResponse.body;
    expect(userObject).toBeTruthy();
  });

  
  it("Route without bearer", async () => {
    const bearerResponse = await mockRequest
      .get("/history/1")
    expect(bearerResponse.text).toBe("Invalid Login");
  });
 it("E-mail is already in use", async () => {
    const response = await mockRequest.post("/signup").send({ username: "user@yahoo.com", password: "123456" });

    expect(response.text).toBe("{\"errors\":[{\"value\":\"user@yahoo.com\",\"msg\":\"E-mail is already in use\",\"param\":\"username\",\"location\":\"body\"}]}");
  });

});
describe("History Route", () => {
  // /////////////////////////////////////////////////////
  it("GET Succeeds with a valid token", async () => {
    const bearerResponse = await mockRequest
      .post("/history")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(history);

    const response = await mockRequest
      .get("/history")
      .set("Authorization", `Bearer ${accessToken}`);
    const userObject = response.body;
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body.length).toEqual(1);
    expect(response.body).toEqual(expect.anything());
  });

  // //////////////////////////////////////////////////////////
  it("POST Succeeds with a valid token CREAT", async () => {
    const bearerResponse = await mockRequest
      .post("/history")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(history);

    expect(bearerResponse.status).toBe(201);
  });
  // ////////////////////////////////////
  it("GET one Succeeds with a valid token", async () => {
    const bearerResponse = await mockRequest
      .get("/history/1")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(bearerResponse.status).toBe(200);
  });

  // ////////////////////////////////////////////////////
  it("Update Succeeds with a valid token CREAT", async () => {
    const updatedHisory = await mockRequest
      .put("/history/1")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(updateHistory);

    expect(updatedHisory.status).toBe(201);
  });
  // ////////////////////////////////////////////////////
  it("delete Succeeds with a valid token CREAT", async () => {
    const bearerResponse = await mockRequest
      .delete("/history/1")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(bearerResponse.status).toBe(204);
  });

  it("Invalid get",async ()=>{
    const bearerResponse = await mockRequest
    .get("/history/i")
    .set("Authorization", `Bearer ${accessToken}`);
  expect(bearerResponse.status).toBe(400);
  })
  it("Invalid put",async ()=>{
    const bearerResponse = await mockRequest
    .put("/history/i")
    .set("Authorization", `Bearer ${accessToken}`);
  expect(bearerResponse.status).toBe(400);
  })
  it("Invalid delete",async ()=>{
    const bearerResponse = await mockRequest
    .delete("/history/i")
    .set("Authorization", `Bearer ${accessToken}`);
  expect(bearerResponse.status).toBe(400);
  })
  it("Invalid post",async ()=>{
    const bearerResponse = await mockRequest
    .post("/history")
    .set("Authorization", `Bearer ${accessToken}`);
  expect(bearerResponse.status).toBe(400);
  })
 
});