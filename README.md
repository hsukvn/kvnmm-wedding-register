## Install
1. `npm install`
1. `npm install -g webpack`
2. `npm run all`

## Methods
1. GET
`curl localhost:8080/api/attendee`

2. POST
`curl -H "Content-Type: application/json" -X POST -d '{"name":"mimi lo", "relation": 1}' http://localhost:8080/api/attendee`

## Develop UI
`npm run ui-dev`

## Build UI
`npm run ui-build`
