const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../build'));
app.listen(5000, () => console.log('client server up on 5000'));
