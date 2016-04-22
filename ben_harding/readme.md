### Sloths Plus Bears
* a slothbear creation framework

#### REST Functionality
* We start with two separate resources: Sloths and Bears.
* Sloths and Bears have GET, POST, PUT, and DELETE REST tools available to them at `/api/bears` and `/api/sloths`.
* You can get all of the bears by sending a GET request to `/api/bears`, or get a single bear by ID at `/api/bears/unique_bear_id_number`.  The sloths have their own identical functionality on the sloths path.

#### Creating Slothbears
* To create a new slothbear, use the `/api/mate` route.  This will grab a random sloth and a random bear and pair them up for a romantic evening.  This will result in a new slothbear!
* Slothbears have their own GET, PUT, and DELETE REST functionality at `/api/slothbears`, however the only way to make a completely new slothbear is through the `/api/mate`.  Sorry POST fans.
* When they are created, new slothbears will store their parents names under the `parents` property in their mongodb entry.  Likewise, each parent with have their new slothbear progeny stored in the `offspring` property of their mongodb entry.
* Like the common mule, slothbears are unfortunately unable to mate themselves.  It is our hope that within time their developer will grant them this ability, making them fully viable species.

#### Getting Started
* This app is currently available only for local deployment.
* First, you will need mongodb installed with a mongod running to handle the Sloth, Bear, and Slothbear resources.
* Second, you will need to seed your initial populations.  Once mongod is running, launch your server using `node index.js` and insert your sloths and bears. One option is to use POST requests to the `/api/sloths` and `/api/bear` routes using a tool like httpie.  Here are some quick start, httpie driven samples you can use (assuming you are using port 3000 to launch your server):
```
http POST localhost:3000/api/sloths name=Pringles
```
```
http POST localhost:3000/api/sloths name=Cuddles
```
```
http POST localhost:3000/api/sloths name=Slowmo
```
```
http POST localhost:3000/api/sloths name=Molasses
```
```
http POST localhost:3000/api/sloths name=Droopy
```
```
http POST localhost:3000/api/bears name='Mr Growlypants'
```
```
http POST localhost:3000/api/bears name=Kodiak
```
```
http POST localhost:3000/api/bears name='Bamboo'
```
```
http POST localhost:3000/api/bears name='Gentle Ben'
```
```
http POST localhost:3000/api/bears name='Mr Growlypants'
```
* Mate away!  The mate route uses a get request, so you can hit `localhost:3000/api/mate` from just about anywhere (browser, curl, httpie, etc) and it will create and return a new slothbear.  Have fun!
