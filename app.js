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
  var re = "Yo 123";
  urban.random().first(function(json){
    console.log(json);
    // re = json->definition;
    res.status(200).send(json);
  });

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
  var re = "123";

  var urban = require('urban');
  word = urban(word);
  word.first(function(json){
    re = json.definition;
    console.log("Divide 1: \n");
    console.log(re);
    console.log("Divide 2: \n");
    console.log(json);
  });
  var payload = {};
  payload[text] = re;
  if(userName !== 'slackbot'){
    return res.status(200).json(payload);
  }
  else {
    return res.status(200).end();
  }
});
