const server = module.exports = require(__dirname + "/server.js");
const port = process.env.PORT || 3000;

server(port);
