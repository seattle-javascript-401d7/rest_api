#REST API

##Instructions
1. Open your command line and type [mongod] to open MongoDB.
2. Open a separate command line and type [export APP_SECRET='appSecret'] then [node app.js] to start the server 3000.
3. Type [mocha] and it should pass 9 tests, 4 for GET, POST, PUT and DELETE methods for each droids and jawas, and a random hash.
4. To signup, open mongo and type a sample below in your command line:
  - echo '{"username": "RE45", "password": "password1"}' | http POST localhost:3000/api/signup
5. To sign-in, again in mongo and type a sample below in your command line(a token will be assigned whenever a user is signed-in, which is needed to process REST methods):
  - http -a RE45:password1 localhost:3000/api/signin
6. Whenever a user is signed-in:
  - to POST or any other REST method, type a sample below in your command line:
    - echo '{"name": "R2D2", "address": "Tatooine"}' | http post localhost:3000/api/droids + token.
7. Gulp may be executed as indicated below. [gulp, gulp lint:test, gulp lint:nontest, gulp mocha:test].

##Testing
- mocha
- gulp - will test ['lint:test', 'lint:nontest', 'mocha:test']
- gulp lint:test and lint:nontest will test ['**/*.js', '!node_modules/**', '!**/db/*']
- gulp mocha:test will test [./test/**/*.js]
