#TWO RESOURCE REST API

MongoDB is required.
Mongoose is required.
Body-Parser is required
ExpressJS is required

## open a mongod connection in a terminal window
## launch node server.js in a separate terminal window
## run GET POST etc. from the command line in a third terminal window

## /bands route
POST band names and genres
GET all band names
PUT a new band name and genre under the same ID
DELETE a band name and genre under a specific ID

example using Httpie: http POST localhost:3000/api/bands bandName=Blondie genre='Pop Rock'
                      http GET localhost:3000/api/bands

## /songs route
POST song titles and band names
GET all song titles
PUT a new song title and band name under the same ID
DELETE a song title and band name under a specific ID

example using Httpie: http POST localhost:3000/api/songs title=Rapture bandName=Blondie
                      http GET localhost:3000/api/songs

## /bandName route (non-CRUD)
GET all the songs by a specific band using /bandName/[name of band] route

example using Httpie: http GET localhost:3000/api/bandName/Blondie
