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

## Testing
Linter and Mocha tests run from the Gulp default. With mongod and the server running,
type 'gulp' at the command line of the third terminal window. 

## Sign-up
To signup, input a username and password in the format below at the command line:
```
echo '{"username": "Kid", "password": "password1"}' | http POST localhost:3000/api/signup
```

## Sign-in
To sign-in, input your username and password in the format below at the command line(a token will be assigned whenever a user is signed-in, which is needed to process REST methods):
```
http -a Kid:password1 localhost:3000/api/signin
```

## /bands route
POST band names and genres
GET all band names
PUT a new band name and genre under the same ID
DELETE a band name and genre under a specific ID

POST and GET requests require you to enter your request along with the user token received on sign-in as shown below:

POST example using Httpie:
```
http POST localhost:3000/api/bands bandName=Blondie genre='Pop Rock' 'token':<enter token here inside quotes, no space after the colon>
```
GET example using Httpie:
```
http GET localhost:3000/api/bands 'token':<enter token here inside quotes, no space after the colon>
```

## /songs route
POST song titles and band names
GET all song titles
PUT a new song title and band name under the same ID
DELETE a song title and band name under a specific ID

POST example using Httpie:
```
http POST localhost:3000/api/songs title=Rapture bandName=Blondie 'token':<enter token here inside quotes, no space after the colon>
```
GET example using Httpie:
```
http GET localhost:3000/api/songs 'token':<enter token here inside quotes, no space after the colon>
```

## /bandName route (non-CRUD)
GET all the songs by a specific band using /bandName/[name of band] route.
No token needed.
Example using Httpie:
```
http GET localhost:3000/api/bandName/Blondie
```
