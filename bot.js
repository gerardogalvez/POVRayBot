const Twit = require('twit');
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

var config = {
     consumer_key: process.env.BOT_CONSUMER_KEY,
     consumer_secret: process.env.BOT_CONSUMER_SECRET,
     access_token: process.env.BOT_ACCESS_TOKEN,
     access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
}

var T = new Twit(config);

var bAmbient = Math.random() > 0.5;
var bDiffuse = Math.random() > 0.5;
var bReflection = Math.random() > 0.5;
var bSpecular = Math.random() > 0.5;
var bRoughness = Math.random() > 0.5;
var bPhong = Math.random() > 0.5;
var bPhongSize = Math.random() > 0.5;

var fAmbient = Math.random();
var fDiffuse = Math.random();
var fReflection = Math.random();
var fSpecular = Math.random();
var fRoughness = Math.random() * (1.0 - 0.0005) + 0.0005;

var randRed = Math.random();
var randGreen = Math.random();
var randBlue = Math.random();

var ambientParameter = ' Declare=bAmbient=' + bAmbient.toString() + ' Declare=fAmbient=' + fAmbient.toFixed(4);
var diffuseParameter = ' Declare=bDiffuse=' + bDiffuse.toString() + ' Declare=fDiffuse=' + fDiffuse.toFixed(4);
var reflectionParameter = ' Declare=bReflection=' + bReflection.toString() + ' Declare=fReflection=' + fReflection.toFixed(4);
var specularParameter = ' Declare=bSpecular=' + bSpecular.toString() + ' Declare=fSpecular=' + fSpecular.toFixed(4);
var roughnessParameter = ' Declare=bRoughness=' + bRoughness.toString() + ' Declare=fRoughness=' + fRoughness.toFixed(4);
var colorsParameter = ' Declare=randRed=' + randRed.toFixed(3) + ' Declare=randGreen=' + randGreen.toFixed(4) + ' Declare=randBlue=' + randBlue.toFixed(4);

var command = 'povray -W800 -H600' + ambientParameter + diffuseParameter + reflectionParameter + specularParameter + roughnessParameter + colorsParameter + ' hello.pov';

var tweetText = '<R, G, B> = <' + randRed.toFixed(4) + ', ' + randGreen.toFixed(4) + ', ' + randBlue.toFixed(4) + '>\n';

if(bAmbient){
     tweetText += 'Ambient: ' + fAmbient.toFixed(4) + '\n';
}

if(bDiffuse){
     tweetText += 'Diffuse: ' + fDiffuse.toFixed(4) + '\n';
}

if(bReflection){
     tweetText += 'Reflection: ' + fReflection.toFixed(4) + '\n';
}

if(bSpecular){
     tweetText += 'Specular: ' + fSpecular.toFixed(4) + '\n';
     if(bRoughness){
          tweetText += 'Roughness: ' + fRoughness.toFixed(4) + '\n';
     }
}

execSync(command);

var image_path = path.join(__dirname, '/hello.png');
var b64content = fs.readFileSync(image_path, { encoding: 'base64' });

T.post('media/upload', { media_data: b64content }, function (err, data, response) {
     if (err){
          console.log('ERROR:');
          console.log(err);
     }
     else{
          console.log('Image uploaded!');
          console.log('Now tweeting it...');
          T.post('statuses/update', {
               media_ids: new Array(data.media_id_string),
               status: tweetText
          },
               function(err, data, response) {
                    if (err){
                         console.log('ERROR:');
                         console.log(err);
                    }
                    else{
                         console.log('Posted an image!');
                    }
               }
          );
     }
});









