# Resty Server
Express server 

# Routes

This server has the following routes:

POST /signup

Handles user sign up requests.

    Returns the new user record in the response body with a status code of 201 if successful, or an error response with a status code of 400 if unsuccessful.

POST /signin

Handles user sign in requests.

    Returns the authenticated user object in the response body with a status code of 200 if successful, or an error response with a status code of 400 if unsuccessful.



 GET  /history

Description:

    Retrieves history records for a user or for all users.



Request Headers:

    Authorization: A bearer token obtained by authenticating with the API.


POST /history

    Description: This endpoint creates a new history record.
    Request Headers: Bearer token
    Request Body: JSON object containing data for the new record
   

PUT /history/:id

    Description: This endpoint updates an existing history record by its ID.
    Request Headers: Bearer token
    Request Parameters: ID of the history record to update
    Request Body: JSON object containing data to update in the record
   

DELETE /history/:id

    Description: This endpoint deletes an existing history record by its ID.
    Request Headers: Bearer token
    Request Parameters: ID of the history record to delete
    

GET /history/:id

    Description: This endpoint retrieves a single history record by its ID.
    Request Headers: Bearer token
    Request Parameters: ID of the history record to retrieve
   


GET /user

     Description:
     Returns all user records.

    Request Headers:
    Authorization: Bearer <token>

    Response Status Codes:
    200 OK - The request was successful and the response contains the user records.
    401 Unauthorized - The request requires authentication and the token is missing or invalid.
    500 Internal Server Error - An error occurred while processing the request on the server.



POST /user

    Description:
    Creates a new user record in the database.

    Request Headers:
    Authorization: Bearer <token>

    Request Body:
    {
    "username": "<string>",
    "password": "<string>",
    "email": "<string>",
    "role": "<string>"
    }





PUT /user/:id

    Description:
    Updates the user record with the specified ID.

    Request Headers:
    Authorization: Bearer <token>

    Request Parameters:
    id: The ID of the user record to update.

    Request Body:
    {
    "username": "<string>",
    "password": "<string>",
    "email": "<string>",
    "role": "<string>"
    }




DELETE /user/:id

    Description:
    Deletes the user record with the specified ID.

    Request Headers:
    Authorization: Bearer <token>

    Request Parameters:
    id: The ID of the user record to delete.



GET /user/:id

    Description:
    Returns the user record with the specified ID.

    Request Headers:
    Authorization: Bearer <token>

    Request Parameters:
    id: The ID of the user record to retrieve.

