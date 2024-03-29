var webshot = require('webshot');
var fs      = require('fs');
var express = require('express');
var app = express();

var config = {
  imagesDir: 'images'
};

var customCSS = '#rately_top_bar,#rately_stage,#rately_visits,\
  .targetgenius__header-bar,.targetgenius__footer-bar,.targetgenius__modal \
  {display: none !important;}';

// respond with "hello world" when a GET request is made to the homepage
app.get('/:domain', function(req, res) {

  var imageName = config.imagesDir + '/' + req.params.domain + '.png',
      absoluteImageName = __dirname + '/' + imageName;

  var imageLoaded = function(err){
    if(err){
      console.log(err)
      res.sendFile('error.png', {root: __dirname + '/images'})
    } else {
      res.sendFile(absoluteImageName);
    }
  }

  fs.exists(absoluteImageName, function (exists) {
    if(exists){
      imageLoaded(null)
    } else {
      webshot(req.params.domain, imageName, {
        timeout: 15000, 
        customCSS: customCSS,
        settings: {
          javascriptEnabled: false
        }
      }, imageLoaded);
    }
  });


});

var server = app.listen(3003, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Webshot app listening at http://%s:%s', host, port);

});
