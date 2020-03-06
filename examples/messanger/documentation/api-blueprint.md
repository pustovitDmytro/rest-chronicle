FORMAT: 1A


    # Group Users 

    ## Positive: show user profile [GET /users/:id]

    + Response 200 (application/json)


    + Headers

        x-powered-by: Express
        x-content-type-options: nosniff
        content-type: application/json; charset&#x3D;utf-8
        content-length: 68
        etag: W/&quot;44-cKRyc1Kt3y5I1UnZTvL/GAhmNZA&quot;
        date: Fri, 06 Mar 2020 19:25:05 GMT
        connection: close

    + Body

    {
        "id": 1,
        "name": "Leigh",
        "email": "helvy0@feedburner.com"
    }

    ## Positive: change user name [PATCH /users/:id]

    + Response 200 (application/json)


    + Headers

        x-powered-by: Express
        x-content-type-options: nosniff
        content-type: application/json; charset&#x3D;utf-8
        content-length: 68
        etag: W/&quot;44-PoB9zlwxM1VephLL9jqUofeAwes&quot;
        date: Fri, 06 Mar 2020 19:25:05 GMT
        connection: close

    + Body

    {
        "id": 2,
        "name": "McCoy",
        "email": "pancell1@gravatar.com"
    }

    # Group Messages 

    ## Positive: get list of messages [GET /messages]

    + Response 200 (application/json)


    + Headers

        x-powered-by: Express
        x-content-type-options: nosniff
        content-type: application/json; charset&#x3D;utf-8
        content-length: 98
        etag: W/&quot;62-qllKFzcjdvCQphgbfpKVoPOu0hY&quot;
        date: Fri, 06 Mar 2020 19:25:05 GMT
        connection: close

    + Body

    [
        {
                "text": "butter property president flow nodded degree where keep",
                "sender": 2
        }
    ]
