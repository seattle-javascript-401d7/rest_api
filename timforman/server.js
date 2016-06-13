if (!process.env.APP_SECRET) throw new Error('You need to set the APP_SECRET environment variable');

var PORT = process.env.PORT || 3000;
var app = require(__dirname + '/_server.js');
app.listen(PORT, 'mongodb://localhost/music_db', () => {
  console.log('Server listening on port:' + PORT);
});
