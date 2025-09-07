import { expect } from "chai" 
import { initializeTestDb, insertTestUser, getToken } from "./helper/test.js"

/* Before hook is used to execute initializeTestDb function once before all tests.  
This will make sure, that database has suitable data for tests which should all pass. 
Tests and initializeTestDb function are both using test database, so make sure, that you have 
started backend for testing (npm run testStart).  */
describe("Testing basic database functionality", () => { 
/* Before calling create endpoint insert a user and generate token. This token can be sent 
as part of http headers and will match with previously generated token.  Also add token 
to delete calls.  */
  let token = null 
  const testUser = { email: "foo@foo.com", password: "password123" }
  // before hook:
  before(() => { 
    initializeTestDb() 
    token = getToken (testUser)
  })
it("should get all tasks", async () => { 
const response = await fetch("http://localhost:3001/") 
const data = await response.json() 
expect(response.status).to.equal(200) 
expect(data).to.be.an("array").that.is.not.empty 
expect(data[0]).to.include.all.keys(["id", "description"]) 
}) 

it("should create a new task", async () => { 
const newTask = { description: "Test task" } 
const response = await fetch("http://localhost:3001/create", { 
  method: "post", 
  headers: { "Content-Type": "application/json",Authorization: token},       
body: JSON.stringify({ task: newTask }) 
}) 
const data = await response.json() 
expect(response.status).to.equal(201) 
expect(data).to.include.all.keys(["id", "description"]) 
expect(data.description).to.equal(newTask.description) 
}) 

it("should delete task", async () => { 
const response = await fetch("http://localhost:3001/delete/1", {
  method: "delete",
  headers: { "Content-Type": "application/json",Authorization: token},
}) 
const data = await response.json() 
expect(response.status).to.equal(200) 
expect(data).to.include.all.keys("id") 
}) 

it("should not create a new task without description", async () => { 
const response = await fetch("http://localhost:3001/create", { 
method: "post", 
headers: { "Content-Type": "application/json", Authorization: token},   
body: JSON.stringify({ task: null}) 
}) 
const data = await response.json() 
expect(response.status).to.equal(400) 
expect(data).to.include.all.keys("error") 
}) 
}) 

describe("Testing user management", () => { 
  /*Create object for test user and before all tests are executed add it into database.*/
  const user = { email: "foo2@test.com", password: "password123" } 
  before(() => { 
  insertTestUser(user) 
  })
it("should sign up", async () => { 
const newUser = { email: "foo@test.com" ,password: "password123" } 
const response = await fetch("http://localhost:3001/user/signup", { 
method: "post", 
headers: { "Content-Type": "application/json"},
body: JSON.stringify({ user: newUser }) 
}) 
const data = await response.json() 
expect(response.status).to.equal(201) 
expect(data).to.include.all.keys(["id", "email"]) 
expect(data.email).to.equal(newUser.email) 
})
/* Implement test for login. 
User with test data will be added before testing signin endpoint.  */
it ('should log in', async () => { 
  const response = await fetch("http://localhost:3001/user/signin", { 
    method: "post", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify({ user })   
  }) 
  const data = await response.json() 
  expect(response.status).to.equal(200) 
  expect(data).to.include.all.keys(["id", "email", "token"]) 
  expect(data.email).to.equal(user.email)
}) 
})