#Simple Shoe Selector
## Two REST API
npm install will load the package.json.
Simple Shoe Selector uses Mongo, MongoDB, Express, Node and HTTPie. If you are unfamiliar with any of these, please review their respective documentation.

### Use:
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
