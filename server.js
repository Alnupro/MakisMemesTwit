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

const fs = require('fs');
const path = require('path');
const axios = require('axios').default;

    const fileUrl = "https://v.redd.it/icm07jkhrxj91/DASH_480.mp4";
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
  'https://v.redd.it/icm07jkhrxj91/DASH_480.mp4';
downloadFile(VIDEO_URL, 'assets');
*/


const randomReddit = require('@elchologamer/random-reddit');

// Create options
let options = {
  imageOnly: true,
  allowNSFW: false,
};

/*
Get a random post from r/memes, 
returning only an image, and not
allowing NSFW posts
*/
randomReddit('memes', options)
  .then((post) => {
    console.log(`Post found: ${post.title}`);
  })
  .catch((err) => {
    console.error(err);
  });





      ( new CronJob( '* * * * *', function() {
const Twitter = require("twitter")
const dotenv = require("dotenv")
const fs = require("fs")

dotenv.config()
        
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const pathToFile = __dirname + '/assets/mlem.avia'
const mediaType = "video/mp4"

const mediaData = fs.readFileSync(pathToFile)
const mediaSize = fs.statSync(pathToFile).size

initializeMediaUpload()
  .then(appendFileChunk)
  .then(finalizeUpload)
  .then(publishStatusUpdate)

function initializeMediaUpload() {
  return new Promise(function(resolve, reject) {
    client.post("media/upload", {
      command: "INIT",
      total_bytes: mediaSize,
      media_type: mediaType
    }, function(error, data, response) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        resolve(data.media_id_string)
      }
    })
  })
}

function appendFileChunk(mediaId) {
  return new Promise(function(resolve, reject) {
    client.post("media/upload", {
      command: "APPEND",
      media_id: mediaId,
      media: mediaData,
      segment_index: 0
    }, function(error, data, response) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        resolve(mediaId)
      }
    })
  })
}

function finalizeUpload(mediaId) {
  return new Promise(function(resolve, reject) {
    client.post("media/upload", {
      command: "FINALIZE",
      media_id: mediaId
    }, function(error, data, response) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        resolve(mediaId)
      }
    })
  })
}

function publishStatusUpdate(mediaId) {
  return new Promise(function(resolve, reject) {
    client.post("statuses/update", {
      status: "", //Message
      media_ids: mediaId
    }, function(error, data, response) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        console.log("Successfully uploaded media and tweeted!")
        resolve(data)
      }
    })
  })
}
  } ) ).start();

} );