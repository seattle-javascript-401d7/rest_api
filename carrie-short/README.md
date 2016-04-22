# REST API for Politicians and Dinosaurs

##Description
An API application that allows you to get, post, put and delete to mongoDB collections of dinosaurs and politicians.

##How to Use
You need to npm install to install dependencies and npm test to test and create a folder for your database
```
npm install
npm test

```
You need to use mongod to run this application. Please refer to documentation for installation and use [https://docs.mongodb.org/manual/reference/program/mongod/](mongod documentation)

```
mongod --dbpath=./db

```
Start the server, this will tell you what port your server is running on. example 5555.
```
npm start

```

###Access API
start making requests. You can use [https://github.com/jkbrzt/httpie](httpie)

####Politicians


Add new politicians remember 5555 should be whatever port server said you were up on
```
http POST localhost:5555/api/politicians name='Hillary Clinton' party='democrat'  debateSkills='7' specialPower='Pant Suit'
http POST localhost:5555/api/politicians name='Bernie Sanders' party='democrat'  debateSkills='8' specialPower='HUUUUUUGE Supporters'


```
Get all politicians
```
http GET localhost:5555/api/politicians

```
Update politician, replace id with politician you can see ID on the previous get request

```
http PUT localhost:5555/api/politicians/<id>  name='Hillary Clinton' party='democrat'  debateSkills='7' specialPower='Steely Eyes'
http PUT localhost:5555/api/politicians/571a85774968b5252b83dfd2  name='Hillary Clinton' party='democrat'  debateSkills='7' specialPower='Steely Eyes'

```
Delete politician
```
http DELETE localhost:5555/api/politicians/<id>
http DELETE localhost:5555/api/politicians/571a85774968b5252b83dfd2

```
####Dinosaurs
Add new dinosaurs remember 5555 should be whatever port server said you were up on
```
http POST localhost:5555/api/dinosaurs name='T-Rex' diet='people'  attack='7' specialPower='Vestigial Arms'

```
Get all dinosaurs
```
http GET localhost:5555/api/dinosaurs

```
Update dinosaur, replace id with dinosaurs you can see ID on the previous get request

```
http PUT localhost:5555/api/dinosaurs/<id>  name='Hillary Clinton' party='democrat'  debateSkills='7' specialPower='Steely Eyes'
http PUT localhost:5555/api/dinosaurs/571a85774968b5252b83dfd2  name='Hillary Clinton' party='democrat'  debateSkills='7' specialPower='Steely Eyes'

```
Delete dinosaur
```
http DELETE localhost:5555/api/dinosaurs/<id>
http DELETE localhost:5555/api/dinosaurs/571a85774968b5252b83dfd2


```

####Versus
Count politicians and dinosaurs
```
http GET localhost:5555/api/versus

```

Pit random politician against random dinosaur
```
http GET localhost:5555/api/battle

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

##To test
gulp will lint and run mocha tests
```
gulp
```
