## API URL
* **User registration:** `POST` http://ec2-3-19-50-116.us-east-2.compute.amazonaws.com/user
* **User login:** `POST` http://ec2-3-19-50-116.us-east-2.compute.amazonaws.com/token
* **User logout:** `DELETE` http://ec2-3-19-50-116.us-east-2.compute.amazonaws.com/token
* **Add comment:** `POST` http://ec2-3-19-50-116.us-east-2.compute.amazonaws.com/comment
* **Update comment:** `PATCH` http://ec2-3-19-50-116.us-east-2.compute.amazonaws.com/comment
* **Delete comment:** `DELETE` http://ec2-3-19-50-116.us-east-2.compute.amazonaws.com/comment
* **Most comment:** `GET` http://ec2-3-19-50-116.us-east-2.compute.amazonaws.com/api/most_comment
* **Search site name:** `GET` http://ec2-3-19-50-116.us-east-2.compute.amazonaws.com/api/search_site_name?name=安和
* **Search area:** `GET` http://ec2-3-19-50-116.us-east-2.compute.amazonaws.com/api/search_area?name=大同
* **Search bike:** `GET` http://ec2-3-19-50-116.us-east-2.compute.amazonaws.com/api/search_bike?num=0

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

## Add comment
* **End Point:** `/comment/`
* **Method:** `POST`
* **Request Headers:**

Field | Type | Description
---------|----------|---------
Authorization | String | Access token preceding Bearer . For example: `Bearer 3733dfc7c18372575de7183399ffc5894576047f992f3594bedf614229a43994`

* **Request Body:**

Field | Type | Description
---------|----------|---------
site_id | number | Required
comment | String | Required 

* **Request Body Example:**
```JSON
{
    "site_id": 17,
    "comment": "test17"
}
```

* **Success Response: 200**
```JSON
{
    "comment": {
        "id": 3,
        "comment": "test17"
    }
}
```

## Update comment
* **End Point:** `/comment/`
* **Method:** `PATCH`
* **Request Headers:**

Field | Type | Description
---------|----------|---------
Authorization | String | Access token preceding Bearer . For example: `Bearer 3733dfc7c18372575de7183399ffc5894576047f992f3594bedf614229a43994`

* **Request Body:**

Field | Type | Description
---------|----------|---------
comment_id | number | Required
comment | String | Required 

* **Request Body Example:**
```JSON
{
    "comment_id": 2,
    "comment": "測試修改"
}
```

* **Success Response: 200**
```JSON
{
    "comment": {
        "id": 2,
        "comment": "測試修改"
    }
}
```

## DELETE comment
* **End Point:** `/comment/`
* **Method:** `DELETE`
* **Request Headers:**

Field | Type | Description
---------|----------|---------
Authorization | String | Access token preceding Bearer . For example: `Bearer 3733dfc7c18372575de7183399ffc5894576047f992f3594bedf614229a43994`

* **Request Body:**

Field | Type | Description
---------|----------|---------
comment_id | Number | Required

* **Request Body Example:**
```JSON
{
    "comment_id": 2
}
```

* **Success Response: 200**
```JSON
{
    "comment": {
        "id": 2
    }
}
```

## Most comments
* **End Point:** `/api/most_comment`
* **Method:** `GET`
* **Query Parameters::**

Field | Type | Description
---------|----------|---------
page | Number | Not Required

* **Request Example:**
```
https://[Host_Name]/api/most_comment?page=2
```

* **Success Response: 200**
```JSON
[
    {
        "id": 17,
        "name": "民生光復路口",
        "parking_num": 34,
        "available_num": 16,
        "address": "光復北路/民生東路(西北側)",
        "address_en": "The N.W. side of Road Guangfu S & Road Minsheng E.",
        "regionName": "松山區",
        "regionNameEn": "Songshan Dist.",
        "comment_count": 5
    },
    {
        "id": 20,
        "name": "捷運科技大樓站",
        "parking_num": 58,
        "available_num": 16,
        "address": "科技大樓站對面(復興南路2段西側)(鄰近資訊科學展示中心)",
        "address_en": "No.235, Sec. 2, Fusing S. Rd.",
        "regionName": "大安區",
        "regionNameEn": "Daan Dist.",
        "comment_count": 3
    },
    {
        "id": 1,
        "name": "捷運市政府站(3號出口)",
        "parking_num": 180,
        "available_num": 15,
        "address": "忠孝東路/松仁路(東南側)",
        "address_en": "The S.W. side of Road Zhongxiao East Road & Road Chung Yan.",
        "regionName": "信義區",
        "regionNameEn": "Xinyi Dist.",
        "comment_count": 2
    }
]
```

## Search area
* **End Point:** `/api/search_area`
* **Method:** `GET`
* **Query Parameters::**

Field | Type | Description
---------|----------|---------
name | String | Required

* **Request Example:**
```
https://[Host_Name]/api/search_site_name?name=安和
```

* **Success Response: 200**
```JSON
[
    {
        "id": 71,
        "name": "捷運信義安和站(4號出口)",
        "name_en": "Daan Dist.",
        "parking_num": 30,
        "available_num": 14,
        "region_id": 2,
        "mday": "2020-12-30T12:57:17.000Z",
        "lat": "25.03298500",
        "lng": "121.55420400",
        "address": "通化街/信義路四段(西南側)(鄰近臨江街夜市(通化夜市)/大安親子館)",
        "address_en": "The S.W. side of Tonghua St. & Sec. 4, Xinyi Road., Daan Dist.",
        "vacant": 15,
        "act": 1,
        "createdAt": "2020-12-30T12:58:19.000Z",
        "updatedAt": "2020-12-30T13:00:14.000Z"
    },
    {
        "id": 307,
        "name": "仁愛安和路口",
        "name_en": "Daan Dist.",
        "parking_num": 30,
        "available_num": 0,
        "region_id": 2,
        "mday": "2020-12-30T12:56:32.000Z",
        "lat": "25.03757000",
        "lng": "121.55207600",
        "address": "仁愛路四段 / 仁愛路四段222巷(東南側)",
        "address_en": "Sec. 4, Ren’ai Rd. / Ln. 222, Sec. 4, Ren’ai Rd.",
        "vacant": 30,
        "act": 1,
        "createdAt": "2020-12-30T12:59:12.000Z",
        "updatedAt": "2020-12-30T13:00:08.000Z"
    },
    {
        "id": 312,
        "name": "捷運信義安和站(1號出口)",
        "name_en": "Daan Dist.",
        "parking_num": 34,
        "available_num": 12,
        "region_id": 2,
        "mday": "2020-12-30T12:56:34.000Z",
        "lat": "25.03332300",
        "lng": "121.55278700",
        "address": "信義路四段 / 安和路一段口(東北側)",
        "address_en": "Sec. 4, Xinyi Rd. / Sec. 1, Anhe Rd.",
        "vacant": 22,
        "act": 1,
        "createdAt": "2020-12-30T12:59:13.000Z",
        "updatedAt": "2020-12-30T13:00:09.000Z"
    }
]
```

## Search area
* **End Point:** `/api/search_area`
* **Method:** `GET`
* **Query Parameters::**

Field | Type | Description
---------|----------|---------
name | String | Required

* **Request Example:**
```
https://[Host_Name]/api/search_area?name=大同
```

* **Success Response: 200**
```JSON
[
    {
        "id": 9,
        "name": "大同區",
        "name_en": "Datong Dist.",
        "parking_num": 32,
        "available_num": 17,
        "region_id": 9,
        "mday": "2020-12-30T12:57:27.000Z",
        "lat": "25.07222800",
        "lng": "121.51019500",
        "address": "延平北路四段/酒泉街(西北側)",
        "address_en": "The N.W. side of Sec. 4, Yanping N. Rd. & Jiuquan St.",
        "vacant": 15,
        "act": 1,
        "createdAt": "2020-12-30T12:58:20.000Z",
        "updatedAt": "2020-12-30T13:00:15.000Z"
    }
]
```

## Search bike
* **End Point:** `/api/search_bike`
* **Method:** `GET`
* **Query Parameters::**

Field | Type | Description
---------|----------|---------
num | Number | Not Required

* **Request Example:**
```
https://[Host_Name]/api/search_bike?num=0
```

* **Success Response: 200**
```JSON
[
    {
        "id": 19,
        "name": "象山公園",
        "name_en": "Xinyi Dist.",
        "parking_num": 30,
        "available_num": 0,
        "region_id": 1,
        "mday": "2020-12-30T12:57:36.000Z",
        "lat": "25.02863000",
        "lng": "121.56981000",
        "address": "松仁路153巷17號對面(鄰近象山步道)",
        "address_en": "No.17, Ln. 153, Songren Rd",
        "vacant": 29,
        "act": 1,
        "createdAt": "2020-12-30T12:58:06.000Z",
        "updatedAt": "2020-12-30T13:00:04.000Z"
    },
    {
        "id": 47,
        "name": "捷運忠孝新生站(4號出口)",
        "name_en": "Daan Dist.",
        "parking_num": 34,
        "available_num": 0,
        "region_id": 2,
        "mday": "2020-11-02T06:55:12.000Z",
        "lat": "25.04227500",
        "lng": "121.53393900",
        "address": "忠孝東路三段 / 新生南路一段口 東北側(鄰近國立台北科技大學)",
        "address_en": "The intersection of Sec. 3, Zhongxiao E. Rd. & Ln. 10, Sec. 3, Zhongxiao E. Rd.",
        "vacant": 0,
        "act": 0,
        "createdAt": "2020-12-30T12:58:12.000Z",
        "updatedAt": "2020-12-30T13:00:09.000Z"
    },
    {
        "id": 55,
        "name": "臺北田徑場",
        "name_en": "Songshan Dist.",
        "parking_num": 46,
        "available_num": 0,
        "region_id": 3,
        "mday": "2020-12-30T12:57:26.000Z",
        "lat": "25.04950500",
        "lng": "121.54940800",
        "address": "敦化北路3號(鄰近臺北小巨蛋/台北田徑場)",
        "address_en": "No.3, Dunhua N. Rd.",
        "vacant": 45,
        "act": 1,
        "createdAt": "2020-12-30T12:58:14.000Z",
        "updatedAt": "2020-12-30T13:00:11.000Z"
    },
    {
        "id": 61,
        "name": "台灣科技大學",
        "name_en": "Daan Dist.",
        "parking_num": 86,
        "available_num": 0,
        "region_id": 2,
        "mday": "2020-12-30T12:57:41.000Z",
        "lat": "25.01310000",
        "lng": "121.53972300",
        "address": "基隆路四段/基隆路四段73巷交叉口(鄰近國立台灣科技大學)",
        "address_en": "The intersection of Sec. 4, Keelung Rd. & Ln. 73, Sec. 4, Keelung Rd",
        "vacant": 83,
        "act": 1,
        "createdAt": "2020-12-30T12:58:15.000Z",
        "updatedAt": "2020-12-30T13:00:12.000Z"
    },
    {
        "id": 97,
        "name": "捷運劍潭站(2號出口)",
        "name_en": "Shilin Dist.",
        "parking_num": 52,
        "available_num": 0,
        "region_id": 12,
        "mday": "2020-12-30T12:57:24.000Z",
        "lat": "25.08282500",
        "lng": "121.52472100",
        "address": "基河路18號對面(鄰近劍潭公園)",
        "address_en": "The opposite of No.18, Jihe Rd.",
        "vacant": 51,
        "act": 1,
        "createdAt": "2020-12-30T12:58:25.000Z",
        "updatedAt": "2020-12-30T13:00:20.000Z"
    },
    {
        "id": 99,
        "name": "捷運雙連站(2號出口)",
        "name_en": "Datong Dist.",
        "parking_num": 42,
        "available_num": 0,
        "region_id": 9,
        "mday": "2020-10-29T03:58:50.000Z",
        "lat": "25.05786600",
        "lng": "121.52071100",
        "address": "民生西路/萬全街(東北側)",
        "address_en": "The N.E. side of Minsheng W. Rd. & Wanquan St.",
        "vacant": 2,
        "act": 1,
        "createdAt": "2020-12-30T12:58:25.000Z",
        "updatedAt": "2020-12-30T13:00:21.000Z"
    },
    {
        "id": 101,
        "name": "華山文創園區",
        "name_en": "Zhongzheng Dist.",
        "parking_num": 50,
        "available_num": 0,
        "region_id": 6,
        "mday": "2020-11-02T06:56:43.000Z",
        "lat": "25.04366800",
        "lng": "121.52848700",
        "address": "忠孝東路二段41號前(鄰近華山文化創意產業園區/光華數位新天地(光華商場)/三創生活園區)",
        "address_en": "Front of No.41, Sec. 2, Zhongxiao E. Rd.",
        "vacant": 0,
        "act": 0,
        "createdAt": "2020-12-30T12:58:26.000Z",
        "updatedAt": "2020-12-30T13:00:21.000Z"
    },
    {
        "id": 185,
        "name": "瑠公公園",
        "name_en": "Daan Dist.",
        "parking_num": 30,
        "available_num": 0,
        "region_id": 2,
        "mday": "2020-11-02T06:55:56.000Z",
        "lat": "25.04234200",
        "lng": "121.54605000",
        "address": "大安路一段/大安路一段75巷(西側)(鄰近東區地下街)",
        "address_en": "Ln. 75, Sec. 1/Ln. 75, Sec. 1, Da’an Rd.",
        "vacant": 0,
        "act": 0,
        "createdAt": "2020-12-30T12:58:45.000Z",
        "updatedAt": "2020-12-30T13:00:42.000Z"
    },
    {
        "id": 229,
        "name": "市民太原路口",
        "name_en": "Datong Dist.",
        "parking_num": 34,
        "available_num": 0,
        "region_id": 9,
        "mday": "2020-12-28T01:01:16.000Z",
        "lat": "25.04939400",
        "lng": "121.51461100",
        "address": "鄭州路23號東側人行道(市民太原路口)(鄰近台北地下街/台北車站)",
        "address_en": "No.23, Zhengzhou Rd. (east side)",
        "vacant": 0,
        "act": 0,
        "createdAt": "2020-12-30T12:58:53.000Z",
        "updatedAt": "2020-12-30T13:00:50.000Z"
    },
    {
        "id": 240,
        "name": "南京建國路口",
        "name_en": "Zhongshan Dist.",
        "parking_num": 58,
        "available_num": 0,
        "region_id": 5,
        "mday": "2020-11-02T07:01:53.000Z",
        "lat": "25.05214100",
        "lng": "121.53680200",
        "address": "南京東路二段/建國北路二段(北側)(鄰近袖珍博物館)",
        "address_en": "Sec. 2, Nanjing E. Rd./Sec. 2, Jianguo N. Rd.",
        "vacant": 0,
        "act": 1,
        "createdAt": "2020-12-30T12:58:55.000Z",
        "updatedAt": "2020-12-30T13:00:53.000Z"
    },
    {
        "id": 252,
        "name": "大安運動中心",
        "name_en": "Daan Dist.",
        "parking_num": 34,
        "available_num": 0,
        "region_id": 2,
        "mday": "2020-12-30T12:57:40.000Z",
        "lat": "25.02054400",
        "lng": "121.54560800",
        "address": "辛亥路三段55號前方人行道(大安運動中心)(鄰近國立臺北教育大學)",
        "address_en": "No.55, Sec. 3, Xinhai Rd.",
        "vacant": 33,
        "act": 1,
        "createdAt": "2020-12-30T12:58:58.000Z",
        "updatedAt": "2020-12-30T13:00:55.000Z"
    },
    {
        "id": 277,
        "name": "中山堂",
        "name_en": "Zhongzheng Dist.",
        "parking_num": 32,
        "available_num": 0,
        "region_id": 6,
        "mday": "2020-12-30T12:56:33.000Z",
        "lat": "25.04409100",
        "lng": "121.51025000",
        "address": "延平南路/武昌街一段東南角人行道(延平武昌街口)(鄰近中山堂/西門町)",
        "address_en": "Yanping S. Rd./Sec. 1, Wuchang St. intersection(southeast)",
        "vacant": 31,
        "act": 1,
        "createdAt": "2020-12-30T12:59:04.000Z",
        "updatedAt": "2020-12-30T13:00:02.000Z"
    },
    {
        "id": 307,
        "name": "仁愛安和路口",
        "name_en": "Daan Dist.",
        "parking_num": 30,
        "available_num": 0,
        "region_id": 2,
        "mday": "2020-12-30T12:56:32.000Z",
        "lat": "25.03757000",
        "lng": "121.55207600",
        "address": "仁愛路四段 / 仁愛路四段222巷(東南側)",
        "address_en": "Sec. 4, Ren’ai Rd. / Ln. 222, Sec. 4, Ren’ai Rd.",
        "vacant": 30,
        "act": 1,
        "createdAt": "2020-12-30T12:59:12.000Z",
        "updatedAt": "2020-12-30T13:00:08.000Z"
    }
]
```