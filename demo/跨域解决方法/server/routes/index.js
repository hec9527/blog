var express = require('express');
var router = express.Router();

router.all('/', function (req, res) {
  var data = {
    code: 0,
    data: {
      name: 'saga',
      age: 34,
      gender: 1,
    },
    message: 'ok',
  };
  res.send(data);
  // res.jsonp(data);
});

module.exports = router;
