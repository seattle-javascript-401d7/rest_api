# Two-Resource REST API with Authentication

Store your favorite Star Trek and Star Wars characters in a database and randomly pit them against one another in battle. Install using `npm install` and verify the tests with `npm test`. Set an `APP_SECRET` environment variable in the same shell session where you plan to run the server:
```
$ export APP_SECRET=[string]
```
This variable will be required to generate the token you will need to make changes to the database.

Start up your local install of MongoDB, then run `npm start` to get your server going (in the same session where you set `APP_SECRET`). The port defaults to `3000` unless you have a PORT environment variable set up. Assuming a default port, create a new user account by submitting a POST request to <http://localhost:3000/api/signup> using the following schema:
```
{
  username: String,
  password: String
}
```
If you're using httpie:
```
$ http POST localhost:3000/api/signup username=[string] password=[string]
```
Once you have created an account, the server will send back a token that you can use to make changes to the character database. If you need to sign back into the app, make an authenticated GET request with your username and password to <http://localhost:3000/api/signin>:
```
$ http -a [username]:[password] localhost:3000/api/signin
```
A new token will be generated for your use each time you sign back into the app.

POST your favorite Star Trek characters to <http://localhost:3000/api/startrekchars> and your favorite Star Wars heroes to <http://localhost:3000/api/starwarschars>. The schema for Star Trek characters is as follows:
```
{
  name: String,
  gender: String,
  rank: String,
  weapon: String [default: "Phaser"],
  power: Number,
  ship: String [default: "Enterprise"]
}
```
The schema for Star Wars heroes is as follows:
```
{
  name: String,
  gender: String,
  weapon: String,
  power: Number,
  planet: String
}
```
__The `name`, `weapon`, and `power` fields are required;__ the others are optional. The `power` value represents the strength of the character in battle. A character with a larger `power` value will always defeat one with a smaller value. Choose any `power` values you like, but they must be valid numbers.
```
$ http POST localhost:3000/api/[startrekchars/starwarschars] token:[token] name=[string] weapon=[string] power=[number]
```
After creating your characters, you can return a list of all characters in your collection by visiting <http://localhost:3000/api/startrekchars> or <http://localhost:3000/api/starwarschars>, or submit a GET request to the appropriate path:
```
$ http GET localhost:3000/api/[startrekchars/starwarschars]
```
You may submit PUT or DELETE requests to the appropriate path followed by the MongoDB ID number of the character you wish to update/delete. For example:
```
$ http PUT localhost:3000/api/[startrekchars/starwarschars]/[_id] token:[token] name=[string] weapon=[string] power=[number]

$ http DELETE localhost:3000/api/[startrekchars/starwarschars]/[_id] token:[token]
```
__All POST, PUT, and DELETE requests must include the token in the request header.__

Once your collection is complete, send your heroes into battle by visiting <http://localhost:3000/api/battle> or submit a GET request:
```
$ http GET localhost:3000/api/battle
```
The server will randomly select one Star Trek and one Star Wars character to fight against each other, and returns an outcome depending on the power levels of the respective characters.
