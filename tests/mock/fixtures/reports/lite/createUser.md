# Users

## create user

### Request

POST /users

**Headers**
* Authorization: 25NPmT

**Body**
```json
{
    "first_name": "Pascal",
    "last_name": "Ancell",
    "email": "pancell1@gravatar.com",
    "gender": "Male"
}
```

### Response 

**Status:** 200

**Type:** application/json

**Headers**
    x-powered-by: Express
    content-length: 120

**Body**
```javascript
{
    id: 2,
    first_name: 'Pascal',
    last_name: 'Ancell',
    email: 'pancell1@gravatar.com',
    gender: 'Male'
}
```