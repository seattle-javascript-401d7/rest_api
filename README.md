#TopGun Pilot Matcher

##Description
This program queries the database of missions and pilots, and will compare the number of missions and pilots. If there are an equal number of pilots then the missions will be sent out! If not the missions will not.

##Use

Navigate to project directory and

`$ npm install`

to download the required dependencies.

make a db directory by simply

`$ mkdir db`

to connect to the database the command for Mongod needs to be run, in this case we are pointing Mongod to our db directory.

`$ mongod --dbpath=./db`

then start the server by

`$ node server`

This documentation uses httpie as it's command line interface, to download via npm

`$ npm install -g httpie`

using curl or another interface will require the user to adjust the command to fit that interface


###Pilots
To Create a Pilot

`$ http POST localhost:8888/api/pilot name="Pete Mitchell" callSign="Maverick" jet="F-18"`

if omitted the jet default is the F-14

To Get the list of Pilots

`$ http GET localhost:8888/api/pilot`

To Update a Pilot

`$ http PUT localhost:8888/api/pilot/:id name="Nick Bradshaw" callSign="Goose" jet="F-14"`

To Delete a Pilot

`$ http Delete localhost:8888/api/pilot/:id`

###Missions
To Create a mission

`$ http POST localhost:8888/api/mission missionName="Milk Run" country="Finland" base="Airbase"`

if omitted the base default is 'Aircraft Carrier'

To Get the list of Missions

`$ http GET localhost:8888/api/mission`

To Update a Mission

`$ http PUT localhost:8888/api/mission/:id name="Screw the Pooch" country="USA" base="Field"`

To Delete a Mission

`$ http Delete localhost:8888/api/mission/:id`

###Mission Pairing
To see if there is enough Pilots or Missions the user can query using the command line tool of their choice by sending a GET request

`$ http GET localhost:8888/api/missionPairing`
