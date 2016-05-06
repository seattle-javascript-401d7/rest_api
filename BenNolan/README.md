# REST API


## HOW TO USE

This app requires `mongod` to be run as well as `node server.js`

### SIGNUP

Using `HTTPIE` sign up with a username and password:

      http POST (localhost):(port)/api/signup username=(username) password=(password)

From here you should be able to sign in

### SIGNIN

Again using  `HTTPIE` sign in with the same username and password:

      http -a (username):(password) (localhost):(port)/api/signin

### Creating a shark/prey

using `HTTPIE` you can create either a shark or prey

      http POST (localhost):(port)/api/(sharks/preys) token:"(token from signin)"  name='(something here)' speed='(something here)' (sharks only- fishPreference('something here'))


## Browser

Now you should be able to go to `localhost:(port)/api/sharks(prey)`
and view your results
