# REST API

## Two Rest Resource API

This is a simple two source api.  The resources use MongoDB as a database.  In order to
use MongoDB, please refer to [MongoDB Docs](https://docs.mongodb.org/manual/).

## API

For the below methods, use the following paths:
```
localhost:3000/api/heroes
localhost:3000/api/villains
```

### GET

A GET request will return all data in the appropriate collection.

### POST

A POST request will allow users to add a hero or villain to their collection.
Use the following format:

Hero:
```
{name:'string', powerLevel: <number 1-10>, superPower: [array of strings], archNemesis: 'string'}
```
Villain:
```
{name:'string', powerLevel: <number 1-10>, superPower: [array of strings], dastardlyDoGooder: 'string'}
```

### PUT / DELETE

PUT requests allow the user to update the information for an appropriate hero or villain.
DELETE requests allow the user to delete the hero or villain from the collection.

To make a PUT or DELETE, use the Mongo generated _id at then end of the path:
```
localhost:3000/api/heroes/_id#
localhost:3000/api/villains/_id#
```

### BATTLE

The api allows for a random hero and villain to do battle.  To perform a battle,
make a GET request to:
```
localhost:3000/api/battle
```
