## User registration
* **End Point:** `/user/`
* **Method:** `POST`
* **Request Body:**

Field | Type | Description
---------|----------|---------
name | String | Required
email | String | Required 
password | String | Required

* **Request Body Example:**
```JSON
{
    "name": "test",
    "email": "test@gmail.com",
    "password": "testtest"
}
```
* **Success Response: 200**
```JSON
{
    "user": {
        "id": 5,
        "name": "test",
        "email": "test@gmail.com"
    },
    "token": {
        "access_token": "06a295f8a2f15f8c82ca8f901e21fcf5c1d7b7fe420fe058273911e4e234af8e",
        "token_expired": "2020-12-30T03:18:39.225Z"
    }
}
```


## User login
* **End Point:** `/token/`
* **Method:** `POST`
* **Request Body:**

Field | Type | Description
---------|----------|---------
email | String | Required 
password | String | Required

* **Request Body Example:**
```JSON
{
    "email": "test@gmail.com",
    "password": "testtest"
}
```
* **Success Response: 200**
```JSON
{
    "token": {
        "access_token": "515e29d53e03c501f78ada9b84175543ea4b5f636fc7be1ec8e0f5eabf512cb0",
        "token_expired": 1609304794618
    }
}
```

## User logout
* **End Point:** `/token/`
* **Method:** `DELETE`
* **Request Headers:**

Field | Type | Description
---------|----------|---------
Authorization | String | Access token preceding Bearer . For example: `Bearer 3733dfc7c18372575de7183399ffc5894576047f992f3594bedf614229a43994`


* **Request Body Example:**
* **Success Response: 200**
```
Logout successful.
```