#ANGULAR-REFACTORING
This is a refactored version of my rest-api. I have made seperate directives and
controllers and templates for both the songs and the movies. Data is retrieved
from the database if it exists and ddisplayed on the page. You can add and
update data via. the page and it is pretty much self explanatory if you are on
the page. To run this app, you must type

'''
gulp
'''

from the root directory. After that, all servers will be running, and all you
have to do is go to

'''
localhost:8888
'''

in your browser, and than you can use this app.

##IMPORTANT NOTES
I am still tweaking with my code to get the update button for the movies to
work.

Also:
The update button for the songs works, but only if you change anything 'OTHER'
than the name of the song. If you change the name of the song, the database will
not update. Again, I am still working on this and trying to fix it. The Movies
edit button works but the update button does not. I am also trying to fix this. 

#ANGULAR - CRUD
this is a version of my two-resource rest-api that uses angular and allows data to be retrieved from the data base and displayed in the browser. The user is also able to add songs and movies in the browser as well as update existing songs or movies, or delete them. User interaction with database in the browser will be reflected in the database.

#REST_API
this is a two resource api that uses mongodb and has access to different songs and movies and has interaction between the two creating a soundtrack suited for that movie based on sad, mad and glad values to the emotions properties on both movies and songs. It is not yet done with the interactions, but the set up is there all i have to do now is create a router for the soundtrack and than apply the interaction. Also, tests will be done tonight hopefully as well.
#AUTHENTICATION
I have a user model set up with a mongoose schema. It has a username and password as well as a property for the hash that takes the place of the password.
