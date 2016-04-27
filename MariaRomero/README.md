##Lions, Tigers, and Bears. Oh my!

###Description

Code Fellows JS401 REST api assignment 4/22/16.

This app is an example of a rest API built with Express that's backed by a Mongo DB with three resources.
It also includes a non CRUD endpoint that returns data based on those resources.
Users can make GET, POST, PUT, and DELETE requests at `/api/:animal` to see and edit the list of lions, tigers, and bears.  GET requests to `/api/ohMy` will let show the user the total number of each animal, and GET requests to `/api/ohMy/:continent` will show the user which animals are on the same continent.

###Usage

Launch the server on `localhost:3000` by running the following on the command line: `node index.js`

To see all the lions, add a lion to the database, update a lion's information, or remove a lion from the database, make a GET, POST, PUT, or DELETE request respectively to `/api/lions`.

The same functionality exists for tigers at `/api/tigers` and for bears at `/api/bears`

To see the total number of each animal make a GET request to `/api/ohMy`

Lions, tigers, and bears are friends, but they can only be friends with others on the same continent.  To see who is friends with whom in different parts of the world, make a GET request to `/api/ohMy:continent` with the possible continents being:  
`Africa`  
`Asia`  
`Europe`  
`North_America`  

###Dependencies

express  
body-parser  
mongoose  
chai  
chai-http  
gulp  
gulp-eslint  
gulp-mocha  
mocha  

###Testing and task-runners

Tests are implemented with chai, chai-http, and mocha; and run with `gulp mocha` and `gulp lint`

###Authors

Maria Romero
