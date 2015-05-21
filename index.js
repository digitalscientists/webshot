var webshot = require('webshot');
var fs      = require('fs');
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/:domain', function(req, res) {

  webshot(req.params.domain, 'images/' + req.params.domain + '.png', function(err) {
    res.sendFile(req.params.domain + '.png', {root: __dirname + '/images'});
  });
  
});

var server = app.listen(3003, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});