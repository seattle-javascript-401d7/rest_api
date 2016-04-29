require('dotenv').config();

if (!process.env.APP_SECRET) {
  throw new Error('APP_SECRET environment variable not set.');
}

const app = require(__dirname + '/_server');

var PORT = process.env.PORT || 5000;
var mongo = process.env.MONGO_LOC || 'mongodb://localhost/db';

app.listen(PORT, mongo, () => process.stdout.write('Server up on port: ' + PORT + '\n'));
