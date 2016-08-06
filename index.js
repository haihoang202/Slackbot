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
    text:"A more complex response from Reply",
    username: "ReplyBot",
    icon_emoji: ":ghost:"
  });
});

controller.on('ambient', function(bot,message){
  bot.reply(message, {
    text:"A more complex response",
    username: "ReplyBot",
    icon_emoji: ":ghost:"
  })
})
