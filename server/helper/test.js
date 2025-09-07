import fs from 'fs' 
import path from 'path' 
import { pool } from './db.js' 
import jwt from 'jsonwebtoken' 
import { hash } from 'bcrypt' 

const __dirname = import.meta.dirname 

/* To ensure, that database structure is correct, 
and data is as expected, database is initialized before running tests. 
Defining a function that reads sql file (todo.sql) 
located in the server folder and executes it.  */

const initializeTestDb = () => { 
    const sql = fs.readFileSync(path.resolve(__dirname, '../init.sql'), 'utf8')
    
    pool.query(sql, (err) => 
        { if (err) { 
            console.error('Error initializing test database:', err) 
        } else { 
            console.log('Test database initialized successfully') 
        } 
    }) 
} 


 /*Create insertTestUser function in test.js. 
 This will be used to add user before running login test. */
const insertTestUser = (user) => { 
  hash(user.password, 10, (err, hashedPassword) => { 
    if (err) { 
      console.error('Error hashing password:', err)
  return       
    } 
    pool.query('INSERT INTO account (email, password) VALUES ($1, $2)',  
      [user.email, hashedPassword],  
      (err, result) => { 
        if (err) { 
          console.error('Error inserting test user:', err) 
        } else { 
          console.log('Test user inserted successfully') 
        } 
      }) 
  }) 
}


/* Tests need to be also modified since it is not anymore possible to call create or delete 
without token. Create getToken function on test.js. Remember to Add required imports 
for jwt. Function will simply create a token with passed email. */
const getToken = (email) =>{ 
  return jwt.sign({ email }, process.env.JWT_SECRET) 
} 
 
export { initializeTestDb, insertTestUser,getToken }



/*
describe("Testing basic database functionality", () => { 
    let token = null 
    const testUser = { email: "foo@foo.com", password: "password123" } 
    before(() => { 
        initializeTestDb() 
        token = getToken(testUser)
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
            headers: { "Content-Type": "application/json", 
                Authorization: token 
            }, 
            body: JSON.stringify({ task: newTask })
         }) 
        }) 
    }) 
    
    //Aiemmin koodissa oli virhe. Korjattu opettajan sähköpostista. Muutosten ohjeet löytyy myös pdf ohjeesta. 
    const insertTestUser = (user) => { 
        hash(user.password, 10, (err, hashedPassword) => { 
            if (err) { 
                console.error('Error hashing password:', err) 
                return 
            } 
            pool.query('INSERT INTO account (email, password) VALUES ($1, $2)', 
                [user.email, hashedPassword], 
                (err, result) => {
                     if (err) { console.error('Error inserting test user:', err) 
                     } else { 
                    console.log('Test user inserted successfully') 
                } 
            })
         })
         } 
         
    describe("Testing user management", () => { 
        const user = { email: "foo2@test.com", password: "password123" } 
        before(() => { 
            insertTestUser(user)
         }) 
         
         it("should sign up", async () => { 
            const response = await fetch("http://localhost:3001/user/signin", { 
                method: "post", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({ user }) }) 
                const data = await response.json() 
                expect(response.status).to.equal(200) 
                expect(data).to.include.all.keys(["id", "email", "token"]) 
                expect(data.email).to.equal(user.email) }) }) 

                const getToken = (email) =>{ 
                    return jwt.sign({ email }, process.env.JWT_SECRET)
                 } 
                 

 export { initializeTestDb, insertTestUser,getToken }*/
 
 
 
 
