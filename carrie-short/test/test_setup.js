const mongoose = require('mongoose');
const server = require(__dirname + '/../server');
const port = process.env.PORT = 5000;

module.exports = exports = (callback) => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/crew_db', () => {
    server.listen(port, () => {
      console.log('server up on port ' + port);
      callback();
    });
  });
};
