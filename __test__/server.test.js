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

    const userObject = response.body;
    expect(response.status).toBe(200);
    expect(userObject.user.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(username);
  });

  it("Can signin with bearer auth token", async () => {
    let { username, password } = userData.testUser;

    // First, use basic to login to get a token
    const response = await mockRequest.post("/signin").auth(username, password);

    accessToken = response.body.user.token;
    // First, use basic to login to get a token
    const bearerResponse = await mockRequest
      .get("/history")
      .set("Authorization", `Bearer ${accessToken}`);
    // Not checking the value of the response, only that we "got in"
    expect(bearerResponse.status).toBe(200);
  });

  it("basic fails with known user and wrong password ", async () => {
    const response = await mockRequest.post("/signin").auth("admin", "xyz");
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
    // First, use basic to login to get a token
    const response = await mockRequest
      .get("/history")
      .set("Authorization", `Bearer foobar`);
    const userList = response.body;

    // Not checking the value of the response, only that we "got in"
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
  // /////////////////////////////////////////////////////
  it("GET Succeeds with a valid token", async () => {
    let { username, password } = userData.testUser;
    //sign in to assign  token 
    const signin = await mockRequest.post("/signin").auth(username, password);

    accessToken = signin.body.user.token;
//post new recored to get it again
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
    expect(response.body.length).toEqual(1)
    expect(response.body).toEqual(expect.anything());
  });
  // ////////////////////////////////////
  it("GET one Succeeds with a valid token", async () => {
    let { username, password } = userData.testUser;
    const response = await mockRequest.post("/signin").auth(username, password);

    accessToken = response.body.user.token;
    const post = await mockRequest
      .post("/history")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(history);

    const bearerResponse = await mockRequest
      .get("/history/1")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(bearerResponse.status).toBe(200);
  });
  // //////////////////////////////////////////////////////////
  it("POST Succeeds with a valid token CREAT", async () => {
    let { username, password } = userData.testUser;
    const response = await mockRequest.post("/signin").auth(username, password);

    accessToken = response.body.user.token;
    const bearerResponse = await mockRequest
      .post("/history")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(history);


    expect(bearerResponse.status).toBe(201);
  });
  // ////////////////////////////////////////////////////
  it("Update Succeeds with a valid token CREAT", async () => {
    let { username, password } = userData.testUser;
    const response = await mockRequest.post("/signin").auth(username, password);

    accessToken = response.body.user.token;
    const postHistory = await mockRequest
    .post("/history")
    .set("Authorization", `Bearer ${accessToken}`).send(history);
    const updatedHisory = await mockRequest
      .put("/history/1")
      .set("Authorization", `Bearer ${accessToken}`).send(updateHistory);
  
      expect(updatedHisory.status).toBe(201);
   
  });
  // ////////////////////////////////////////////////////
  it("delete Succeeds with a valid token CREAT", async () => {
    userData.testUser.role="admin";
    let { username, password } = userData.testUser;
    const response = await mockRequest.post("/signin").auth(username, password);

    accessToken = response.body.user.token;

    const postHistory = await mockRequest
    .post("/history")
    .set("Authorization", `Bearer ${accessToken}`).send(history);

    const bearerResponse = await mockRequest
      .delete("/history/1")
      .set("Authorization", `Bearer ${accessToken}`);
console.log("****************",bearerResponse.body);
      expect(bearerResponse.status).toBe(204);
   
  });
 
});
