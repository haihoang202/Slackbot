var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.status(200).send('Hello World!');
});

app.listen(port, function(){
  console.log('Listening on port '+port);
});

app.post('/hello', function(req, res, next){
  var userName = req.body.user_name;
  var botPayload = {
    text:'Hello ' + userName + '. Welcome to Hoang Dev Team'

  };
  // res.send('Got a POST request');

  if(userName !== 'slackbot'){
    return res.status(200).json(botPayload);
  }
  else {
    return res.status(200).end();
  }
});

app.post('/def', function(req, res, next){
  var word = req.body.text;

  var payload = {
    text:' means Hahah'
  };
  if(userName !== 'slackbot'){
    return res.status(200).json(payload);
  }
  else {
    return res.status(200).end();
  }
});
