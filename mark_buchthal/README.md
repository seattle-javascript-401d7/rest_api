# REST API

## Two Rest Source API

This is a simple two source api.  There is a database for both heroes and villains.

### GET / POST / PUT / DELETE

Both the heroes and villains databases take the above methods at the following path:

```
/api/heroes
```
```
/api/villains
```

### BATTLE

The api allows for a random hero and villain to do battle.  To perform a battle,
make a GET request to:
```
/api/battle
```
