var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: require('./config').token
})
bot.startRTM(function(err,bot,payload) {
  if (err) {
    console.log(err);
    throw new Error('Could not connect to Slack');
  }
});

controller.hears(["hey","^pattern$"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
  // do something to respond to message
  // all of the fields available in a normal Slack message object are available
  // https://api.slack.com/events/message
  bot.reply(message, {
    text:"What's up",
    username: "ReplyBot",
    icon_emoji: ":ghost:"
  });
});

controller.hears(["let\'s talk","^pattern$"],["direct_message","direct_mention","mention","ambient"], function(bot,message){
  askHairColor = function(response, convo){
    convo.ask('What type of pizza would you like to eat?', function(response, convo){
      convo.say('Awesome.');
      askBoobSize(response, convo);
      convo.next();
    });
  }
  askBoobSize = function(response, convo){
    convo.ask('How about the size you want ?', function(response, convo){
      convo.say('Uhhh! Nice!!!');
      askWhere(response, convo);
      convo.next();
    });
  }
  askWhere = function(response, convo){
    convo.ask('Where do you wnat to deliver?', function(response, convo){
      convo.say('Gotcha! Get ready. Goods is coming in a minute');
      display(response, convo);
      convo.next();
    });
  }
  display = function(response, convo){
    var values = convo.extractResponses();
    var value = values.key;
    console.log(values);
    bot.reply(message, {
      text:values,
      username: "ReplyBot",
      icon_emoji: ":ghost:"
    });convo.next();
  }
 

  bot.startConversation(message, askHairColor);
});

controller.on('ambient', function(bot,message){

  bot.reply(message, {
    text:"A more complex response",
    username: "ReplyBot",
    icon_emoji: ":ghost:"
  })
});

controller.hears('attachment','direct_message,direct_mention', function(bot, message){
  var attachment = {
    'username':'Jarvis',
    'text':'I heard you call me!',
    'attachment':[
      {
        'fallback':'I\'m here to assist you whatever you need!',
        'title':'How can I help you?',
        'text':'Give me a task!',
        'color':'#7CD197'
      }
    ],
    'icon_emoji':':ghost:'
  }

  bot.reply(message, attachment);
});

// listen for the phrase `shirt` and reply back with structured messages
// containing images, links and action buttons
controller.hears(['shirt'],["direct_message","direct_mention","mention","ambient"], function(bot,message){
    bot.reply(message, {
        attachment: {
            'type':'template',
            'payload':{
                 'template_type':'generic',
                 'elements':[
                   {
                     'title':'Classic White T-Shirt',
                     'image_url':'http://petersapparel.parseapp.com/img/item100-thumb.png',
                     'subtitle':'Soft white cotton t-shirt is back in style',
                     'buttons':[
                       {
                         'type':'web_url',
                         'url':'https://petersapparel.parseapp.com/view_item?item_id=100',
                         'title':'View Item'
                       },
                       {
                         'type':'web_url',
                         'url':'https://petersapparel.parseapp.com/buy_item?item_id=100',
                         'title':'Buy Item'
                       },
                       {
                         'type':'postback',
                         'title':'Bookmark Item',
                         'payload':'USER_DEFINED_PAYLOAD_FOR_ITEM100'
                       }
                     ]
                   },
                   {
                     'title':'Classic Grey T-Shirt',
                     'image_url':'http://petersapparel.parseapp.com/img/item101-thumb.png',
                     'subtitle':'Soft gray cotton t-shirt is back in style',
                     'buttons':[
                       {
                         'type':'web_url',
                         'url':'https://petersapparel.parseapp.com/view_item?item_id=101',
                         'title':'View Item'
                       },
                       {
                         'type':'web_url',
                         'url':'https://petersapparel.parseapp.com/buy_item?item_id=101',
                         'title':'Buy Item'
                       },
                       {
                         'type':'postback',
                         'title':'Bookmark Item',
                         'payload':'USER_DEFINED_PAYLOAD_FOR_ITEM101'
                       }
                     ]
                   }
                 ]
               }
        }
    });
});
