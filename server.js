/* Setting things up. */
const Twitter = require("twitter")
const fs = require("fs")
var request = require('request');

const express = require( 'express' ),
      app = express(),
      CronJob = require( 'cron' ).CronJob,
      Twit = require( 'twit' ),
      config = {
      /* Be sure to update the .env file with your API keys. See how to get them: https://botwiki.org/tutorials/how-to-create-a-twitter-app */      
        twitter: {
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          access_token: process.env.TWITTER_ACCESS_TOKEN,
          access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        }
      },
      T = new Twit( config.twitter );

app.use( express.static( 'public' ) );

let listener = app.listen( process.env.PORT, function(){
  console.log( 'Your bot is running on port ' + listener.address().port );

  /*
    Set up a new cron job to start tweeting automatically.
    Check out https://www.npmjs.com/package/cron#available-cron-patterns to learn more about cron scheduling patterns.
    
    For a few examples, see https://glitch.com/edit/#!/creative-bots?path=helpers%2Fcron-schedules.js

  */

  ( new CronJob( '0 19 * * *', function() {
    
    /* The example below tweets out "Hello world 👋" and the current date. */

    const date = new Date().toLocaleString();
    T.post( 'statuses/update', { status: 'Hello world 👋 ' + date }, function( err, data, response ) {
      if ( err ){
        console.log( 'error!', err );
      }
      else {
        console.log( 'tweeted', `https://twitter.com/${ data.user.screen_name }/status/${ data.id_str }` );
      }
    } );
  } ) ).start();

  ( new CronJob( '0 19 * * *', function() {
    
    /*Send cat*/

var b64content = fs.readFileSync(__dirname + '/assets/2.jpg', { encoding: 'base64' })
 
// first we must post the media to Twitter
T.post('media/upload', { media_data: b64content }, function (err, data, response) {
  // now we can assign alt text to the media, for use by screen readers and
  // other text-based presentations and interpreters
  var mediaIdStr = data.media_id_string
  var altText = "Small flowers in a planter on a sunny balcony, blossoming."
  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
 
  T.post('media/metadata/create', meta_params, function (err, data, response) {
    if (!err) {
      // now we can reference the media and post a tweet (media will attach to the tweet)
      var params = { status: 'Cat', media_ids: [mediaIdStr] }
 
      T.post('statuses/update', params, function (err, data, response) {
        console.log(data)
      })
    }
  })
})
                                           
  } ) ).start();
  
  
  
  
  
  
  
  
  
  
//SEND https://www.reddit.com/r/FunnyAnimals/ memes __dirname + '/assets/example.mp4'

    /*
const fs = require('fs');
const path = require('path');
const axios = require('axios').default;

    const fileUrl = "https://www.kindacode.com/wp-content/uploads/2021/01/example.mp4";
    const downloadFolder = __dirname + '/assets/';
// fileUrl: the absolute url of the image or video you want to download
// downloadFolder: the path of the downloaded file on your machine
const downloadFile = async (fileUrl, downloadFolder) => {
  // Get the file name
  const fileName = path.basename(fileUrl);

  // The path of the downloaded file on our machine
  const localFilePath = path.resolve(__dirname, downloadFolder, fileName);
  try {
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
    });

    const w = response.data.pipe(fs.createWriteStream(localFilePath));
    w.on('finish', () => {
      console.log('Successfully downloaded file!');
    });
  } catch (err) { 
    throw new Error(err);
  }
}; 

// Testing
/*const IMAGE_URL =
  'https://www.kindacode.com/wp-content/uploads/2021/01/test.jpg';
downloadFile(IMAGE_URL, 'download');*/

/*
const VIDEO_URL =
  'https://www.kindacode.com/wp-content/uploads/2021/01/example.mp4';
downloadFile(VIDEO_URL, 'asset');*/
    
var bufferLength, filePath, finished, fs, oauthCredentials, offset, request, segment_index, theBuffer;

request = require('request');
fs = require('fs');
filePath = __dirname + '/assets/example.mp4';
bufferLength = 1000000;
theBuffer = new Buffer(bufferLength);
offset = 0;
segment_index = 0;
finished = 0;
oauthCredentials = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    token: process.env.TWITTER_ACCESS_TOKEN,
    token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

fs.stat(filePath, function(err, stats) {
    var formData, normalAppendCallback, options;

    formData = {
        command: "INIT",
        media_type: 'video/mp4',
        total_bytes: stats.size
    };
    options = {
        url: 'https://upload.twitter.com/1.1/media/upload.json',
        oauth: oauthCredentials,
        formData: formData
    };

    normalAppendCallback = function(media_id) {
        return function(err, response, body) {

            finished++;
            if (finished === segment_index) {

                options.formData = {
                    command: 'FINALIZE',
                    media_id: media_id
                };
                request.post(options, function(err, response, body) {
                    console.log('FINALIZED',response.statusCode,body);

                    delete options.formData;

                    //Note: This is not working as expected yet.
                    options.qs = {
                        command: 'STATUS',
                        media_id: media_id
                    };
                    request.get(options, function(err, response, body) {
                        console.log('STATUS: ', response.statusCode, body);
                    });
                });
            }
        };
    };


    request.post(options, function(err, response, body) {
        var media_id;
        media_id = JSON.parse(body).media_id_string;

        fs.open(filePath, 'r', function(err, fd) {
            var bytesRead, data;

            while (offset < stats.size) {

                bytesRead = fs.readSync(fd, theBuffer, 0, bufferLength, null);
                data = bytesRead < bufferLength ? theBuffer.slice(0, bytesRead) : theBuffer;
                options.formData = {
                    command: "APPEND",
                    media_id: media_id,
                    segment_index: segment_index,
                    media_data: data.toString('base64')
                };
                request.post(options, normalAppendCallback(media_id));
                offset += bufferLength;
                segment_index++
            }
        });
    });
}); 
  
} );