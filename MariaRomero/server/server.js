const app = require(__dirname + '/_server.js');
const port = process.env.PORT || 3000;

app(port, process.env.MONGODB_URI || 'mongodb://localhost/ohMy_appDB', console.log('server up on ' + port));
