#TWO RESOURCE REST API

MongoDB is required.
Mongoose is required.
Body-Parser is required
ExpressJS is required
Bcrypt is required
jsonwebtoken is required

## secret key is required to launch the server
## must authenticate by signup and signin with a token

##To use this app

1. Open a mongod connection in a terminal window
2. In a different terminal window enter "export APP_SECRET='appsecret'"
3. Launch node server.js in a separate terminal window.
4. In a third terminal window run GET POST etc. from the command line. 

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
