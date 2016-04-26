#REST API

##Instructions
1. Open your command line and type [mongod] to open MongoDB.
2. Open a separate command line and type [node app.js] to start the server 3000.
3. Type [mocha] and it should pass 8 tests, 4 for GET, POST, PUT and DELETE methods for each droids and jawas.
4. Gulp may be executed as indicated below. [gulp, gulp lint:test, gulp lint:nontest, gulp mocha:test].
5. Open another separate command line to manage your methods - POST, GET, PUT, PATCH and DELETE with the below pre-typed POST samples of both Droids and Jawas resources.

http POST localhost:3000/api/droids name=RE45 address=Tatooine email=re45@gmail.com

http POST localhost:3000/api/droids name=C9G5 address=Naboo email=c9g5@gmail.com

http POST localhost:3000/api/droids name=W12S address=Tatooine email=w12s@gmail.com

http POST localhost:3000/api/jawas name=Kali address=Naboo email=kali@gmail.com

http POST localhost:3000/api/jawas name=Jama address=Naboo email=jama@gmail.com

http POST localhost:3000/api/jawas name=Lapu address=Tatooine email=lapu@gmail.com

http POST localhost:3000/api/jawas name=Tila address=Tatooine email=tila@gmail.com

6. There is a query that will names of either droids and jawas that resides in either 'Tatooine' by using the below url to your browser, same as for 'Naboo':

http GET localhost:3000/api/address/Tatooine
  - results ["RE45","W12S","Lapu","Tila"]

http GET localhost:3000/api/address/Naboo
  - results ["C9G5","Kali","Jama"]

##Testing
- mocha
- gulp - will test ['lint:test', 'lint:nontest', 'mocha:test']
- gulp lint:test and lint:nontest will test ['**/*.js', '!node_modules/**', '!**/db/*']
- gulp mocha:test will test [./test/**/*test.js]
