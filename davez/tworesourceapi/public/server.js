const express = require('express');

express().use(express.static(__dirname + '/../build')).listen(8888, () => {
  console.log('server up on 8888');
});
