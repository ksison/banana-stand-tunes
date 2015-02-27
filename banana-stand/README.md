##How to run.

1. Make sure mongo is running on mongodb://localhost:27017
2. Set up vvps and kick off the server
```
npm run setup && npm start
```

### To run importer
From banana-stand sub folder
```
node import-scripts/song-importer.js <path to directory with music>
```
>Note: The importer is still in a primitive stage, so don't give it a huge folder.
> Normandyxo tried it with 279 songs (3.72 GB) and had no problems!

###Example of GET
```
curl localhost:8080/v1/songs/:id
```