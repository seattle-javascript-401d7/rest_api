#Simple Shoe Selector
## Two REST API with Authorization
npm install will load the package.json.
Simple Shoe Selector uses Mongo, MongoDB, Express, Node and HTTPie. If you are unfamiliar with any of these, please review their respective documentation.

### Add a user
Users are added with "username" (which must be unique) and "password" which must simply exist. As before, be sure to verify the port that your Node server is listening on. The command line syntax for adding a user is as follows:

http POST :port/signup username="Quotes are needed if you use a space" password="something secure but memorable"

###Verify that the user has been added
There are two ways to verify that a user has been added to the database:

* Look at the users collection in the database. New additions are added to the bottom of the list.
* Ask for the JSON web token (jwt). This is a rather large combination of ASCII characters that will be different every time a user is requested. However, receiving a jwt is confirmation that the requested username/password combination does exist. Both the username and the password must be in quotes, regardless of whether the string has spaces.

From the command line:

http GET :port/signin -a "username":"password"

### Build the Data:
you will need to use HomeBrew to install HTTPie.
Open four terminal windows.
* TERM 1: mongod --dbpath=./data - this will show that it's listening on 27017
* TERM 2: mongo - this will show the mongo command line
* TERM 3: node index - will begin running the database code. Note the port that the server says it's running on. My default is 3030; yours may be different.
* TERM 4: command line. Use HTTPie to enter database commands: http POST localhost:3030/api/(route).  Route can be either pants or shoes.

Pants Schema:
'fabric', 'cut' and 'color' are the three criteria for pants. 'Cut' defaults to 'slacks'.

Shoes Schema:
'brand', 'type', 'color', slipOn, and 'polish' are the criteria for shoes. 'slipOn' defaults to 'false', 'type' defaults to 'Oxfords' and 'polish' defaults to 'dress'.

### Something useful
Once shoes and pants data has been entered into the db, head over to localhost:3030/wardrobe to find out how many possible shoes/pants combinations you can make.
