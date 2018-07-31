## Install
1. `npm install`
1. `npm install -g webpack`
2. `npm run all`

## Methods
1. POST /api/signup
```
http POST localhost:8080/api/signup email=test@example.com password=123
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 165
Content-Type: application/json; charset=utf-8
Date: Tue, 18 Apr 2017 15:04:32 GMT
ETag: W/"a5-vwturq1tmW1avLgTqC7AjUpbX0I"
X-Powered-By: Express

{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGY2MmIwMGJiNTM4MTI4YmYwNDIzMGQiLCJpYXQiOjE0OTI1Mjc4NzI2Mjl9.NWQkVRf2GEFbYV9bsZVPI0aStb8Cga0hPzLE7PJ6LlM"
}
```

2. POST /api/signin
```
http POST localhost:8080/api/signin  email=test@example.com password=123
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 165
Content-Type: application/json; charset=utf-8
Date: Tue, 31 Jul 2018 10:11:44 GMT
ETag: W/"a5-LoiNAz9bIDWduHF0VShtfg"
Vary: X-HTTP-Method-Override
X-Powered-By: Express

{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjYwMDM3YTMyNDRiYTNlN2NmMWQyNjUiLCJpYXQiOjE1MzMwMzE5MDQxMzN9.4VipsQfEkDD79-Dw6f0RY1MoGvs7qKt_K938a4VRW88"
}
```

3. GET /api/attendee
```
http GET localhost:8080/api/attendee authorization:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjYwMjRmNGNjZDI5NzI5NmM4MTM0MzUiLCJpYXQiOjE1MzMw
Mjc1NzI4NDR9.pJwvyTGAQNHT_8mt6m1Lo-XdgJMmPvAGgPqUl0B48Sw
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 938
Content-Type: application/json; charset=utf-8
Date: Tue, 31 Jul 2018 10:13:48 GMT
ETag: W/"3aa-4R74NyoWlNRjYESPG5ll6g"
X-Powered-By: Express

[{...}]
```

## Develop UI
`npm run ui-dev`

## Build UI
`npm run ui-build`
