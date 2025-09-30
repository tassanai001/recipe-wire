# Authentication API Documentation

## Endpoints

### POST /v1/auth/signup

Registers a new user account.

#### Request Body
```json
{
  "email": "string (required, valid email format)",
  "password": "string (required, min 8 chars, must contain letter and number)",
  "displayName": "string (required, 2-50 characters)",
  "bio": "string (optional, max 500 characters)"
}
```

#### Success Response (201 Created)
```json
{
  "id": "string (UUID)",
  "email": "string",
  "displayName": "string",
  "bio": "string | null",
  "avatarUrl": "string | null",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)",
  "message": "User registered successfully"
}
```

#### Error Responses
- `400 Bad Request`: Validation error
  ```json
  {
    "statusCode": 400,
    "message": "Error details",
    "error": "Bad Request"
  }
  ```
- `409 Conflict`: Email already exists
  ```json
  {
    "statusCode": 409,
    "message": "Email already exists"
  }
  ```
- `500 Internal Server Error`: Server error
  ```json
  {
    "statusCode": 500,
    "message": "Internal server error",
    "error": "Internal Server Error"
  }
  ```

#### Example Request
```bash
curl -X POST http://localhost:3001/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123",
    "displayName": "John Doe",
    "bio": "A passionate cook"
  }'
```