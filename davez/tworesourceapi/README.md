# updated REST-API w/ angular and Helper service
In this assignment, I created a service that displays errors for either my songs
controller or my movies controller. It displays an error that is based on if one
of the CRUD (create, read, update or delete) methods fails to work. It displays
the error message in red above the form for either movies or songs, depending on
where the error is coming from. I also incorporated unit testing to make sure
that everything is all good with my service. Complete instructions for how to
run this app and also run the tests and also install everything needed in order
for it to work, can be found below.

# Installing the app
1. Type '''npm install''' from root directory
  - this will install all necessary packages needed for running the app and the
tests.

# Starting the app
1. Open 2 terminal windows, and type '''mongod''' in one of them.
  - this starts the mongodb database
2. In the 2nd window, type: '''gulp''' from the root directory
  - this starts the servers needed for the app to work.
3. navigate to: '''localhost:8888''' in your browser
4. Input data into the input fields
  - only numbers can be used for the year
5. Have fun!!

# Running end-to-end protactor tests
1. open three seperate terminal windows
2. in one window run mongo by typing '''mongod'''
  - this starts the mongo database
3. in another window, type: '''gulp''' from the root directory
  - this starts the necessary servers
4. in the last window, type: '''gulp webpack:test''' from the root directory
5. in the same window as step 4, type: '''protractor test/protractor/conf.js''' from root directory
6. all tests should run and pass

# Running Unit (karma) tests
1. type: '''gulp webpack:test''' from root directory
2. ensure that karma.conf.js is set to '''single run: true'''
3. type '''karma start''' from root directory
4. all tests should run and pass

#ANGULAR - CRUD
this is a version of my two-resource rest-api that uses angular and allows data to be retrieved from the data base and displayed in the browser. The user is also able to add songs and movies in the browser as well as update existing songs or movies, or delete them. User interaction with database in the browser will be reflected in the database.

#REST_API
this is a two resource api that uses mongodb and has access to different songs and movies and has interaction between the two creating a soundtrack suited for that movie based on sad, mad and glad values to the emotions properties on both movies and songs. It is not yet done with the interactions, but the set up is there all i have to do now is create a router for the soundtrack and than apply the interaction. Also, tests will be done tonight hopefully as well.
#AUTHENTICATION
I have a user model set up with a mongoose schema. It has a username and password as well as a property for the hash that takes the place of the password.
