var Twit = require('twit');
var fs = require('fs');
var path = require('path');

var config = {
     consumer_key: process.env.BOT_CONSUMER_KEY,
     consumer_secret: process.env.BOT_CONSUMER_SECRET,
     access_token: process.env.BOT_ACCESS_TOKEN,
     access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
}

var T = new Twit(config);

var phraseArray = [ "hey twitter",
                    "im tweeting",
                    "tweet tweet",
                    "tweetstorm time... 1/22",
                    "plz RT v important",
                    "delete ur account",
                    "it me",
                    "same",
                    "#dogpants go on 4 legs!!",
                    "#thedress is blue and black" ];

function chooseRandom(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}

var phrase = chooseRandom(phraseArray) + ", " + chooseRandom(phraseArray);

T.post('statuses/update', { status: phrase }, function(err, data, response) {
  console.log(data)
});