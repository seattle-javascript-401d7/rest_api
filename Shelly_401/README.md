#Description
This is an authorization-requiring REST API that utilizes MongoDB with two Mongoose schemas to catalog and organize your collections of mugs and vinyl. Sign up at /api/signup. Sign in at /api/signin. Record new instances of mugs or vinyl with a POST request at /api/mugs or /api/vinyl, respectively. View the corresponding records with a GET request at /api/mugs or /api/vinyl. Update with a PUT request to /api/mugs/:id or /api/vinyl/:id and delete with a DELETE request to /api/mugs/:id or /api/vinyl/:id.

##Usage:

```
$ node server
```

##Test:
```
$Mocha
```
##Taskrunner:
```
$Gulp
```

### Dependencies:
can be found by consulting package.json 
