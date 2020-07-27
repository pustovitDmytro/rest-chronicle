# Cities 

## Get list of cities
    
### Request

    GET /cities

**Headers**

* authorization: 'API KEY'


### Response

**Status:** 200 

**Type:** application/json

**Body**

```javascript 
[
  {
    id: 1,
    name: 'Verkhnya Rozhanka',
    coordinates: { lat: 48.7799795, lon: 23.51569 },
    country: 'Ukraine'
  },
  {
    id: 2,
    name: 'Cincinnati',
    coordinates: { lat: 39.1822152, lon: -84.4225186 },
    country: 'United States'
  },
  {
    id: 3,
    name: 'Eindhoven',
    coordinates: { lat: 51.5244042, lon: 5.7576526 },
    country: 'Netherlands'
  },
  {
    id: 4,
    name: 'Halton',
    coordinates: { lat: 53.800245, lon: -1.48003 },
    country: 'United Kingdom'
  },
  ... 16 more items
]
```


## Get one city
    
### Request

    GET /cities/:id

**Headers**

* authorization: 'API KEY'


### Response

**Status:** 200 

**Type:** application/json

**Body**

```javascript 
{
  id: 1,
  name: 'Verkhnya Rozhanka',
  coordinates: { lat: 48.7799795, lon: 23.51569 },
  country: 'Ukraine'
}
```


## Update Existing City
    
### Request

    PATCH /cities/:id

**Headers**

* authorization: 'API KEY'

**Body**

```json          
    {
        "id": 1,
        "name": "Verkhnya Rozhanka",
        "coordinates": {
                "lat": 48.7799795,
                "lon": 23.51569
        },
        "country": "Ukraine"
    }
```

### Response

**Status:** 200 

**Type:** application/json

**Body**

```javascript 
{
  id: 1,
  name: 'Verkhnya Rozhanka',
  coordinates: { lat: 48.7799795, lon: 23.51569 },
  country: 'Ukraine'
}
```


## Create new City
    
### Request

    POST /cities

**Headers**

* authorization: 'API KEY'

**Body**

```json          
    {
        "id": 8,
        "name": "New York City",
        "coordinates": {
                "lat": 40.7582228,
                "lon": -73.9704871
        },
        "country": "United States"
    }
```

### Response

**Status:** 200 

**Type:** application/json

**Body**

```javascript 
{
  id: 8,
  name: 'New York City',
  coordinates: { lat: 40.7582228, lon: -73.9704871 },
  country: 'United States'
}
```

# Forecasts 

## Forecasts for specific city
    
### Request

    GET /forecasts

**Query**

* cityId: 3

**Headers**

* authorization: 'API KEY'


### Response

**Status:** 200 

**Type:** application/json

**Body**

```javascript 
[
  {
    id: '363dd8fb-7c61-4f1c-b031-c461c9174a29',
    city: 3,
    weather: 'rainbows',
    date: '23-Feb-2020'
  },
  {
    id: '796c17fa-519a-4cdc-aa44-98da7d4b4eed',
    city: 3,
    weather: 'foggy',
    date: '09-Sep-2019'
  }
]
```


## Get list of forecasts
    
### Request

    GET /forecasts

**Headers**

* authorization: 'API KEY'


### Response

**Status:** 200 

**Type:** application/json

**Body**

```javascript 
[
  {
    id: '2d5f723a-6ec2-4f56-befc-54e63ce860be',
    city: 5,
    weather: 'stormy',
    date: '19-Aug-2019'
  },
  {
    id: '78dabf6f-7ab3-400d-b54f-c9c0f2f0e206',
    city: 4,
    weather: 'stormy',
    date: '21-Jan-2020'
  },
  {
    id: 'bee812e3-a28f-4603-90d9-fc58f80bc4ec',
    city: 6,
    weather: 'sunny',
    date: '06-Jun-2019'
  },
  {
    id: '3b296097-0b9e-483e-a51c-ac35943ea719',
    city: 8,
    weather: 'rainbows',
    date: '13-Mar-2020'
  },
  ... 36 more items
]
```


## Update Forecast
    
### Request

    PATCH /forecasts/:id

**Headers**

* authorization: 'API KEY'

**Body**

```json          
    {
        "id": "2d5f723a-6ec2-4f56-befc-54e63ce860be",
        "city": 5,
        "weather": "stormy",
        "date": "19-Aug-2019"
    }
```

### Response

**Status:** 200 

**Type:** application/json

**Body**

```javascript 
{
  id: '2d5f723a-6ec2-4f56-befc-54e63ce860be',
  city: 5,
  weather: 'stormy',
  date: '19-Aug-2019'
}
```

