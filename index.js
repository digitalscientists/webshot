var webshot = require('webshot');
var fs      = require('fs');
var express = require('express');
var app = express();

var config = {
  imagesDir: 'images'
};

// respond with "hello world" when a GET request is made to the homepage
app.get('/:domain', function(req, res) {

  var imageName = config.imagesDir + '/' + req.params.domain + '.png';

  var imageLoaded = function(err){
    res.sendFile(req.params.domain + '.png', {root: __dirname + '/' + config.imagesDir});
  }

  fs.exists(__dirname + '/' + imageName, function (exists) {
    if(exists){
      imageLoaded(null)
    } else {
      webshot(req.params.domain, imageName, imageLoaded);
    }
  });


});

var server = app.listen(3003, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});