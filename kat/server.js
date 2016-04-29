if (!process.env.APP_SECRET) throw new Error('Please set the APP_SECRET');
var PORT = process.env.PORT || 5555;
var app = require(__dirname + '/_server.js');
app.listen(PORT, 'mongodb://localhost/kat_db', () => console.log('server alive at' + PORT));
