# rest-api
Two resource rest API for the 401d7 course, written by Greg Magdsick

## Models
The model for creating a jazz master is as follows:

```js
pedal
{
  model: { type: String, require: true, unique: true },
  gears: Number,
  frameType: String,
  maxSpeed: Number
}

motor
{
  model: { type: String, require: true, unique: true },
  displacement: Number,
  cylinders: Number,
  maxSpeed: Number
}
```

## Running
  * Open the terminal
  * Clone the repo to your own computer

### Install packages

```bash
> npm install
```

### Start mongodb

```bash
> mongod --dbpath ./db
```

### Run tests
```bash
> gulp
```

### Run the server
Open another terminal window and navigate to your project's home directory
```bash
> npm start
```

### How to use
Now you can use a HTTP client with standard REST commands to interact with your bike database. Using a GET command on the endpoint below will yield all the bikes in the database of the type listed in the route. Using a POST command on the endpoint below will allow you to add a bike to the database, following the models defined above.
```
http://localhost:5000/api/pedal
http://localhost:5000/api/motor

```

For PUT and DELETE requests, the endpoint is the same, see below. For a PUT request, you should add all the fields for the Jazz Master, not just the fields you want to change. For a DELETE request, no data is needed to be sent.
```
http://localhost:5000/api/pedal[bike name]
http://localhost:5000/api/motor[bike name]
```

## Author

Written by
[Greg Magdsick](https://github.com/gregmagdsick)


## Acknowledgements
I was able to reference code written during lecture for examples on how to implement each piece of this project.

## License

The project is licensed under the terms of the MIT license.
