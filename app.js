var express = require('express');
var bodyParser = require('body-parser');
var unirest = require('unirest');
// var urban = require('urban');

var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  // res.status(200).send('Hello World!');
  var urban = require('urban');
  var re = "";
  urban.random().first(function(json){
    console.log(json);
    re = json.definition;
  });
  res.status(200).send(re);
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
  var userName = req.body.user_name;
  var re = "";
  unirest.get("https://mashape-community-urban-dictionary.p.mashape.com/define?term=watch")
.header("X-Mashape-Key", "2f5jJRAZVsmshu3LtG1ho3JoOEL9p1cKCrfjsna4vtPBumLj5p")
.header("Accept", "text/plain")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
  re = result.body;
});

  var payload = {
    text: "Get it"
  };
  if(userName !== 'slackbot'){
    return res.status(200).json(payload);
  }
  else {
    return res.status(200).end();
  }
});
