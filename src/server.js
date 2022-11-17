const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('some dumy');
});

app.listen(3000, function () {
  console.log('App is running on localhost:3000');
});
