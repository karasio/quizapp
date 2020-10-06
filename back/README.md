# API usage

**Show user**
---
Returns json of user

* **URL**

    /api/users/:id
    
* **Method**

    GET
    
* **URL params**

    id=[String] User id
    
* **Response**

    * **Content**: `{
                        "id": "5f745fe24d49943d327b1461",
                        "username": "janne",
                        "highscore": 30
                    }`

**Show users**
----
  Returns json of all users.

* **URL**

  /api/users

* **Method:**
  
  GET
  
* **Response:**

   * **Content:** `{[{user1 JSON}, {user2 JSON}, ...]}`
 
**Add user**
----

Adds a user to list and returns json of added user

* **URL**

    /api/users

* **Method:**
  
    POST
  
* **Response:**
  
     * **Content:** 
     `{
     "id":"5f7c4d6868353f2ea22ba218",
     "username":"aleksi",
     "highScore":0
     }`
     
* **Additional information**

    Authentication needed!
     
**Update user**
----
Updates user and returns JSON of user

* **URL**

    /api/users/:id
    
* **Method:**

    PUT
    
* **URL params**

    id=[String] User id
    
* **Response**

    * **Content:** 
    `{
    "id":"5f7c4d6868353f2ea22ba218",
    "username":"aleksi",
    "highScore":5
    }`
    
* **Additional information**

    Authentication needed!
    
**Delete user**
----

Delete user from database

* **URL**

    /api/users/:id
    
* **Method:**

    DELETE
    
* **URL params**

    id=[String] User id
    
* **Response**

    **Code**: 204
    
**Login user**
---

Login user to database

* **URL**

    /api/login/

* **Method:**

    POST

* **Response**
    * **Content:**
    `{
        highScore: 5
        id: "5f7c4d6887654353f2ea22ba218"
        token: "eyJhbGciOiJIUzI1sjkhdkjanR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZWtzaSIsImlkIjoiNWY3YzRkNjg2ODM1M2YyZWEyMmJhMjE4IiwiaWF0IjoxNjAxOTgyMzgyfQ.NQxbNozXTXZbw5UsYBvRi18FyOtulq3cMP2A3_PdBBE"
        username: "aleksi"
    }`
