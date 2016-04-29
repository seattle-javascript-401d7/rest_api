# REST API for Politicians and Dinosaurs

##Description
An API application that allows you to get, post, put and delete to mongoDB collections of dinosaurs and politicians.

##How to Use
You need to npm install to install dependencies and create a folder for your database.
```
npm install
```
You need to use mongod to run this application. Please refer to documentation for installation and use [mongod documentation](https://docs.mongodb.org/manual/reference/program/mongod/)

```
mongod --dbpath=./db
```
Start the server, this will tell you what port your server is running on. example 5555.
```
npm start
```

###Access API
start making requests. You can use [httpie](https://github.com/jkbrzt/httpie)

####Unprotected Routes
Get all politicians
```
http GET localhost:5555/api/politicians
```

Get all dinosaurs
```
http GET localhost:5555/api/dinosaurs
```

Count politicians and dinosaurs
```
http GET localhost:5555/api/versus
```

Pit random politician against random dinosaur
```
http GET localhost:5555/api/battle
```

####Protected Routes

To access protected routes you will need to signup or signin if you've signed up previously

#####Signup
Signup will return a webtoken to you. Keep this on hand as it is necessary for accessing protected routes.
```
http POST localhost:5555/api/signup username="some user name" password="some password"
```

#####Signin
Signin will return a webtoken to you. Keep this on hand as it is necessary for accessing protected routes.
```
http -a some\ user\ name:some\ password localhost:5555/api/signin
```
####Politicians


Add new politicians remember 5555 should be whatever port server said you were up on
```
http POST localhost:5555/api/politicians name='Hillary Clinton' party='democrat'  debateSkills='7' specialPower='Pant Suit' token:[token provided on signup or signin]
http POST localhost:5555/api/politicians name='Bernie Sanders' party='democrat'  debateSkills='8' specialPower='HUUUUUUGE Supporters' token:[token provided on signup or signin]


```

Update politician, replace id with politician you can see ID on the previous get request

```
http PUT localhost:5555/api/politicians/<id>  name='Hillary Clinton' party='democrat'  debateSkills='7' specialPower='Steely Eyes' token:[token provided on signup or signin]
http PUT localhost:5555/api/politicians/571a85774968b5252b83dfd2  name='Hillary Clinton' party='democrat'  debateSkills='7' specialPower='Steely Eyes' token:[token provided on signup or signin]
```
Delete politician
```
http DELETE localhost:5555/api/politicians/<id> token:[token provided on signup or signin]
http DELETE localhost:5555/api/politicians/571a85774968b5252b83dfd2 token:[token provided on signup or signin]
```
####Dinosaurs
Add new dinosaurs remember 5555 should be whatever port server said you were up on
```
http POST localhost:5555/api/dinosaurs name='T-Rex' diet='people'  attack='7' specialPower='Vestigial Arms' token:[token provided on signup or signin]
```

Update dinosaur, replace id with dinosaurs you can see ID on the previous get request

```
http PUT localhost:5555/api/dinosaurs/<id>  name='RockaSaur' diet="weak musac"  attack='11' specialPower='mind melting tunes' token:[token provided on signup or signin]
http PUT localhost:5555/api/dinosaurs/571a85774968b5252b83dfd2  name='RockaSaur' diet="weak musac"  attack='11' specialPower='mind melting tunes' token:[token provided on signup or signin]
```
Delete dinosaur
```
http DELETE localhost:5555/api/dinosaurs/<id> token:[token provided on signup or signin]
http DELETE localhost:5555/api/dinosaurs/571a85774968b5252b83dfd2 token:[token provided on signup or signin]
```


##Dev-Dependencies
* chai
* chai-http
* gulp
* gulp-eslint
* gulp-mocha
* mocha

##Dependencies
* express
* mongoose
* body-parser
* bcrypt
* jsonwebtoken

##To test
You must have done an npm install and started mongod before tests will run. npm test will run mocha. Gulp will lint and run mocha tests.
```
npm test
gulp
```
