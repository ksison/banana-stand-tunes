##How to run.

1. Make sure mongo is running on mongodb://localhost:27017
2. Set up vvps and kick off the server
```
npm run setup && npm start
```

###Example of GET
```
curl localhost:8080/v1/songs/:id
```