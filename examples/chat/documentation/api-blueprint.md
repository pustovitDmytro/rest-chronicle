FORMAT: 1A

# Users 

## Positive: show user profile [GET /users/:id]

+ Request

    + Headers
        

+ Response 200 (application/json)
        
    + Headers
  
        x-powered-by: Express
        x-content-type-options: nosniff
        content-type: application/json; charset&#x3D;utf-8
        content-length: 68
        etag: W/&quot;44-cKRyc1Kt3y5I1UnZTvL/GAhmNZA&quot;
        date: Sun, 09 May 2021 21:58:28 GMT
        connection: close
        
    + Body
         
        {
            "id": 1,
            "name": "Leigh",
            "email": "helvy0@feedburner.com"
        }
        

## Positive: change user name [PATCH /users/:id]

+ Request

    + Headers
        
        AUTH: 5NM2p40Z8
        Content-Type: application/json
 
    + Body
        
        {
            "name": "McCoy"
        }

+ Response 200 (application/json)
        
    + Headers
  
        x-powered-by: Express
        x-content-type-options: nosniff
        content-type: application/json; charset&#x3D;utf-8
        content-length: 68
        etag: W/&quot;44-PoB9zlwxM1VephLL9jqUofeAwes&quot;
        date: Sun, 09 May 2021 21:58:28 GMT
        connection: close
        
    + Body
         
        {
            "id": 2,
            "name": "McCoy",
            "email": "pancell1@gravatar.com"
        }
        
# Messages 

## Positive: get list of messages [GET /messages]

+ Request

    + Headers
        
        AUTH: 5NM2p40Z8
        Content-Type: application/json

    + Parameters
        
        sender: 2
        limit: 5
 
    + Body
        
        {
            "name": "McCoy"
        }

+ Response 200 (application/json)
        
    + Headers
  
        x-powered-by: Express
        x-content-type-options: nosniff
        content-type: application/json; charset&#x3D;utf-8
        content-length: 98
        etag: W/&quot;62-qllKFzcjdvCQphgbfpKVoPOu0hY&quot;
        date: Sun, 09 May 2021 21:58:28 GMT
        connection: close
        
    + Body
         
        [
            {
                "text": "butter property president flow nodded degree where keep",
                "sender": 2
            }
        ]
        
