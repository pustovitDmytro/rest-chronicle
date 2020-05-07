# Users

## create user

### Request

POST /users

**Headers**
* Authorization: 25NPmT

**Body**
```javascript
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

**Body**
```javascript
{
    "id": 2,
    "first_name": "Pascal",
    "last_name": "Ancell",
    "email": "pancell1@gravatar.com",
    "gender": "Male"
}
```