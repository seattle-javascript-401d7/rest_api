/* eslint-env mocha */
const Router = require('express').Router;
const Lion = require(__dirname + '/../../models/lions');
const Tiger = require(__dirname + '/../../models/tigers');
const Bear = require(__dirname + '/../../models/bears');
const errorHandler = require(__dirname + '/../../lib/errorHandler');
var ohMyRouter = new Router();

var displayGreatest = function(array) {
  var displayString = 'There are more ' + array[0] + 's than ' + array[2] + 's and '
  + array[4] + 's! Oh my! \n There are ' + array[1] + ' ' + array[0] + 's, '
  + array[3] + ' ' + array[2] + 's, and ' + array[5] + ' ' + array[4] + 's.';
  return displayString;
};

ohMyRouter.get('/ohMy', (req, res) => {
  // [0] is name of largest, [1] is count of largest, [2] - [5] are the other two
  var greatestArray = [0, ''];
  var lionCount = 0;
  var tigerCount = 0;
  var bearCount = 0;

  Lion.count(null, (err, count) => {
    if (err) return errorHandler(err);
    lionCount = count;
    if (count > greatestArray[1]) {
      greatestArray[0] = 'lion';
      greatestArray[1] = count;
    }
    Tiger.count(null, (err, count) => {
      if (err) return errorHandler(err);
      tigerCount = count;
      if (count > greatestArray[1]) {
        greatestArray[0] = 'tiger';
        greatestArray[1] = count;
      }
      Bear.count(null, (err, count) => {
        if (err) return errorHandler(err);
        bearCount = count;
        if (count > greatestArray[1]) {
          greatestArray[0] = 'bear';
          greatestArray[1] = count;
        }
        if (greatestArray[0] !== 'lion') {
          greatestArray.push('lion');
          greatestArray.push(lionCount);
        }
        if (greatestArray[0] !== 'tiger') {
          greatestArray.push('tiger');
          greatestArray.push(tigerCount);
        }
        if (greatestArray[0] !== 'bear') {
          greatestArray.push('bear');
          greatestArray.push(bearCount);
        }
        var text = displayGreatest(greatestArray);
        res.status(200).send(text);
      });
    });
  });
});

function displayFriends(location, array) {
  var string = 'Lions, tigers, and bears are friends, but they can\'t cross oceans.  They ' +
  'can only be friends with others on their continent.  The friends in ' + location + ' are:   ';
  array.forEach( (current) => {
    string += current.name + ' who lives in ' + current.location + ',  ';
  });
  return string;
}

ohMyRouter.get('/ohMy/:continent', (req, res) => {
  var region = req.params.continent;
  var collectionArray = [Lion, Tiger, Bear];
  var friends = [];
  var promiseArray = collectionArray.map( (collection) => {
    return collection.find({ continent: region }).exec();
  });
  Promise.all(promiseArray).then( (resultsArray) => {
    friends = resultsArray.reduce( (previous, current) => {
      return previous.concat(current);
    }, []);
    var text = displayFriends(region, friends);
    res.status(200).send(text);
  });
});

module.exports = exports = ohMyRouter;
