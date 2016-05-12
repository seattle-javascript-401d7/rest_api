const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Contorl-Allow-Headers', 'Content-Type');
  res.header('Access-Contorl-Allow-Methods', 'DELETE, PUT');
  next();
});
app.use(express.static(__dirname + '/../build'));
app.listen(5000, () => console.log('client server up on 5000'));
