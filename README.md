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

GET /history

    Description: This endpoint retrieves all history records.
    Request Headers: Bearer token
    Response Status Codes:
        200: Success
        401: Unauthorized
        500: Internal Server Error

POST /history

    Description: This endpoint creates a new history record.
    Request Headers: Bearer token
    Request Body: JSON object containing data for the new record
    Response Status Codes:
        201: Created
        400: Bad Request (due to invalid input data)
        401: Unauthorized
        500: Internal Server Error

PUT /history/:id

    Description: This endpoint updates an existing history record by its ID.
    Request Headers: Bearer token
    Request Parameters: ID of the history record to update
    Request Body: JSON object containing data to update in the record
    Response Status Codes:
        200: Success
        400: Bad Request (due to invalid input data)
        401: Unauthorized
        404: Not Found (if the history record with the specified ID is not found)
        500: Internal Server Error

DELETE /history/:id

    Description: This endpoint deletes an existing history record by its ID.
    Request Headers: Bearer token
    Request Parameters: ID of the history record to delete
    Response Status Codes:
        200: Success
        401: Unauthorized
        404: Not Found (if the history record with the specified ID is not found)
        500: Internal Server Error

GET /history/:id

    Description: This endpoint retrieves a single history record by its ID.
    Request Headers: Bearer token
    Request Parameters: ID of the history record to retrieve
    Response Status Codes:
        200: Success
        401: Unauthorized
        404: Not Found (if the history record with the specified ID is not found)
        500: Internal Server Error

GET /history?url=<url>

    Description: This endpoint retrieves all history records that contain a specific URL.
    Request Headers: Bearer token
    Request Query Parameters: URL to search for
    Response Status Codes:
        200: Success
        401: Unauthorized
        500: Internal Server Error