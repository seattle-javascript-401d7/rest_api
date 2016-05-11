### Sloths Plus Bears
* a slothbear creation framework, now with user authentication!

#### User authentication
* Before starting, you need a token.
* You can get a token one of two ways...
* If you are not yet a user, you need to sign up.  To do this, send a POST request to `/api/signup`.  You will need to send a username and password.  An example httpie request would look like this: `http POST localhost:3000/api/signup username=USERNAME password=PASSWORD`.  If a new user is created, it will be stored in the database and a token will be sent in return.  KEEP THIS TOKEN.
* If you are already a user and don't remember your token, you can sign in to receive a new one.  To do this you send a GET request to `/api/signin` that includes your username and password.  An example httpie requst would look like this: `http USERNAME:PASSWORD@localhost:3000/api/signin`

#### REST Functionality
* We start with two separate resources: Sloths and Bears.
* Each user has access to their own Sloths and Bears using their secure token.
* Sloths and Bears have GET, POST, PUT, and DELETE REST tools available to them at `/api/bears` and `/api/sloths`.  The secure user token must be passed with the request.  An example httpie POST request would be sent like this: `http POST localhost:3000/api/bears name=Growly token:CRAZYHEXUSERTOKEN`
* You can get all of your bears by sending a GET request to `/api/bears`, or see information about any single bear by ID at `/api/bears/unique_bear_id_number`.  The sloths have their own identical functionality on the sloths path.

#### Creating Slothbears
* To create a new Slothbear, use the `/api/mate` route.  This will grab a random sloth and a random bear and pair them up for a romantic evening.  This will result in a new Slothbear!  You will need to pass your user token so the system can log who wrangled the Slothbear.
* Slothbears have their own GET, PUT, and DELETE REST functionality at `/api/slothbears`, however the only way to make a completely new Slothbear is through the `/api/mate`.  Slothbears also need the token passed during REST commands.
* When they are created, new Slothbears will store their parents names under the `parents` property in their mongodb entry.  Likewise, each parent with have their new Slothbear progeny stored in the `offspring` property of their mongodb entry.
* Like the common mule, Slothbears are unfortunately unable to mate themselves.  It is our hope that within time their developer will grant them this ability, making them fully viable species.

#### Getting Started
* This app is currently available only for local deployment.
* First, you will need mongodb installed with a mongod running to handle the Sloth, Bear, and Slothbear resources.
* Second, you will need to seed your initial populations.  Once mongod is running, launch your server using `node index.js` and insert your sloths and bears. One option is to use POST requests to the `/api/sloths` and `/api/bear` routes using a tool like httpie.  Here are some quick start, httpie driven samples you can use (assuming you are using port 3000 to launch your server):
```
http POST localhost:3000/api/sloths name=Pringles token:INSERT_USER_TOKEN
```
```
http POST localhost:3000/api/sloths name=Cuddles token:INSERT_USER_TOKEN
```
```
http POST localhost:3000/api/sloths name=Slowmo token:INSERT_USER_TOKEN
```
```
http POST localhost:3000/api/sloths name=Molasses token:INSERT_USER_TOKEN
```
```
http POST localhost:3000/api/sloths name=Droopy token:INSERT_USER_TOKEN
```
```
http POST localhost:3000/api/bears name='Mr Growlypants' token:INSERT_USER_TOKEN
```
```
http POST localhost:3000/api/bears name=Kodiak token:INSERT_USER_TOKEN
```
```
http POST localhost:3000/api/bears name='Bamboo' token:INSERT_USER_TOKEN
```
```
http POST localhost:3000/api/bears name='Gentle Ben' token:INSERT_USER_TOKEN
```
```
http POST localhost:3000/api/bears name=Fluffy token:INSERT_USER_TOKEN
```
* Mate away!
