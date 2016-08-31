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
  var response_type = "";

  if(word.includes("-m")){
    response_type = "ephemeral";
  }
  else {
    response_type = "in_channel";
  }

  word = word.replace("-m","");
  word = word.trim();
  // if(word_array[0].trim() == "-m"){
  //   payload["response_type"] = "ephemeral";
  //   word = word.replace("-m","");
  // }
  // else {
  //   payload["response_type"] = "in_channel";
  // }

  var urban = require('urban');
  word1 = urban(word);
  word1.first(function(json){
    if(typeof json == 'undefined'){
      var payload = {};

      payload["response_type"] = response_type;
      payload["text"] = "Temporarily ungathered word :/";

    }
    else{
      re = word + " means: " + json.definition;
      var payload = {};

      payload["response_type"] = response_type;
      payload["text"] = re;
      payload["error"]={};
      payload["error"]["code"]=2;
      payload["error"]["msg"]="Temporarily ungathered :/";

      console.log(payload);
    }
    if(userName !== 'slackbot'){
      return res.status(200).json(payload);
    }
    else {
      return res.status(200).end();
    }

  });
});
