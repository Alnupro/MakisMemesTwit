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
var old_date = new Date();

app.use( express.static( 'public' ) );

let listener = app.listen( process.env.PORT, function(){
  console.log( 'Your bot is running on port ' + listener.address().port );

  /*
    Set up a new cron job to start tweeting automatically.
    Check out https://www.npmjs.com/package/cron#available-cron-patterns to learn more about cron scheduling patterns.
    
    For a few examples, see https://glitch.com/edit/#!/creative-bots?path=helpers%2Fcron-schedules.js
  */
/*
  ( new CronJob( '0 19 * * *', function() {
    
    /* The example below tweets out "Hello world 👋" and the current date. */
/*
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

 ( new CronJob( '0 19 * * *', function() { */
    
    /*Send cat*/
/*
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

*/
  
  
  
        ( new CronJob( '0 12 * * *', function() {
var params = {
    id: '1'
    // count: 3
}
T.get('trends/place', params, gotData);

    function gotData(err, data, response) {
        var tweets = data;
        var hash1 = tweets[0]['trends'][0]['name'];
        var hash2 = tweets[0]['trends'][1]['name'];
        var hash3 = tweets[0]['trends'][2]['name'];
        var hash4 = tweets[0]['trends'][3]['name'];
        var hash5 = tweets[0]['trends'][4]['name'];
        var hash6 = tweets[0]['trends'][5]['name'];
        var hash7 = tweets[0]['trends'][6]['name'];
        var hash8 = tweets[0]['trends'][7]['name'];
        var hash9 = tweets[0]['trends'][8]['name'];
        var hash10 = tweets[0]['trends'][9]['name'];
      
      if(hash1.includes('#') == false)
        {
          hash1 = '#' + tweets[0]['trends'][0]['name'];
        }
      if(hash2.includes('#') == false)
        {
          hash2 = '#' + tweets[0]['trends'][1]['name'];
        }
      if(hash3.includes('#') == false)
        {
          hash3 = '#' + tweets[0]['trends'][2]['name'];
        }
      if(hash4.includes('#') == false)
        {
          hash4 = '#' + tweets[0]['trends'][3]['name'];
        }
      if(hash5.includes('#') == false)
        {
          hash5 = '#' + tweets[0]['trends'][4]['name'];
        }
      if(hash6.includes('#') == false)
        {
          hash6 = '#' + tweets[0]['trends'][5]['name'];
        }
      if(hash7.includes('#') == false)
        {
          hash7 = '#' + tweets[0]['trends'][6]['name'];
        }
      if(hash8.includes('#') == false)
        {
          hash8 = '#' + tweets[0]['trends'][7]['name'];
        }
      if(hash9.includes('#') == false)
        {
          hash9 = '#' + tweets[0]['trends'][8]['name'];
        }
      if(hash10.includes('#') == false)
        {
          hash10 = '#' + tweets[0]['trends'][9]['name'];
        }
          
    T.post( 'statuses/update', { status: "Hello world 👋 A new day begins !\n\nTop 10 # in the World today:\n" + hash1 + "\n" + hash2 + "\n" + hash3 + "\n" + hash4 + "\n" + hash5 + "\n" + hash6 + "\n" + hash7 + "\n" + hash8 + "\n" + hash9 + "\n" + hash10}, function( err, data, response ) {
      if ( err ){
        console.log( 'error!', err );
      }
      else {
        console.log( 'tweeted (new day !)', `https://twitter.com/${ data.user.screen_name }/status/${ data.id_str }` );
      }
    } );
    }
          fs.readFile('already.txt', 'utf8', function (err, data) {
            console.log("New Day !\nalready.txt content :\n\n")
            console.log(data);
          })
  } ) ).start();
  

  
  
  
//SEND https://www.reddit.com/r/FunnyAnimals/ memes __dirname + '/assets/example.mp4'

/*const fs = require('fs');
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
}; */

// Testing
/*const IMAGE_URL =
  'https://www.kindacode.com/wp-content/uploads/2021/01/test.jpg';
downloadFile(IMAGE_URL, 'download');*/

/*
const VIDEO_URL =
  'https://v.redd.it/icm07jkhrxj91/DASH_480.mp4';
downloadFile(VIDEO_URL, 'assets');
*/
  function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
  console.log(old_date)
  
  var already_vids = [];
  var next_post_url = null
  var save_random_number = null;
function FindMedia () {
  console.log("Wait before Finding")
  function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
  wait(20000);
console.log("start finding")
const Twitter = require("twitter")
const dotenv = require("dotenv")
const fs = require("fs")
dotenv.config()
  
  const pathDelete = __dirname + '/assets/video.mp4';

try {
  fs.unlinkSync(pathDelete)
  console.log("video.mp4 deleted");
  //file removed
} catch(err) {
  console.log("No file /assets/video.mp4 to delete");
}
        
try{
dotenv.config()
  
//RANDOM VIDEO
const randomPuppy = require('random-puppy');

//RANDOM SUBREDDIT
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const random_number = getRandomInt(7);
save_random_number = random_number;
  if(random_number == 0)
    {
var event = randomPuppy('Unexpected')
}
  else if(random_number == 1)
    {
      var event = randomPuppy('ContagiousLaughter')
    }
  else if(random_number == 2)
    {
      var event = randomPuppy('ThereWasAnAttempt')
    }
      else if(random_number == 3)
      {
      var event = randomPuppy('dankvideos')
      }
      else if(random_number == 4)
      {
      var event = randomPuppy('shitposting')
      }
  else if(random_number == 5)
    {
      var event = randomPuppy('UnusualVideos')
    }
   else if(random_number == 6)
    {
      var event = randomPuppy('Whatcouldgowrong')
    }
  else
  {
      var event = randomPuppy('UnusualVideos')
  }

const promise1 = Promise.resolve(event);
        var urlfunny = null;
promise1.then((funny) => {
  //console.log(funny)
  console.log("Got url");
  urlfunny = funny;
  console.log("urlfunny found : ");
console.log(urlfunny);
  
  
  
//CHECK IF ALREADY IN already.txt
   var fs = require('fs');
 fs.readFile('already.txt', 'utf8', function (err, data) {
   const content = data;
   while(content.includes(urlfunny) == true || urlfunny.substr(urlfunny.length-3, 3) != "mp4")
     {
const promise1 = Promise.resolve(event);
        var urlfunny = null;
promise1.then((funny) => {
  //console.log(funny)
  console.log("Got url");
  urlfunny = funny;
  console.log("urlfunny found : ");
console.log(urlfunny);
    })
    const { getVideoDurationInSeconds } = require('get-video-duration');
getVideoDurationInSeconds(urlfunny).then((duration) => {
      if(duration > 30 || urlfunny.substr(urlfunny.length-3, 3) != "mp4" || content.includes(urlfunny) == true)
        {
    console.log("> 30 sec, find another...")
const promise2 = Promise.resolve(event);
promise2.then((funny) => {
  //console.log(funny)
  console.log("Got url");
  urlfunny = funny;
  console.log("urlfunny found : ");
console.log(urlfunny);
  
  getVideoDurationInSeconds(urlfunny).then((duration) => {
          if(duration > 30 || urlfunny.substr(urlfunny.length-3, 3) != "mp4" || content.includes(urlfunny) == true)
        {
    console.log("> 30 sec, find another... (2)")
const promise2 = Promise.resolve(event);
promise2.then((funny) => {
  //console.log(funny)
  console.log("Got url");
  urlfunny = funny;
  console.log("urlfunny found : ");
console.log(urlfunny);
})}
    
  getVideoDurationInSeconds(urlfunny).then((duration) => {
          if(duration > 30 || urlfunny.substr(urlfunny.length-3, 3) != "mp4" || content.includes(urlfunny) == true)
        {
    console.log("> 30 sec, find another... (3)")
const promise2 = Promise.resolve(event);
promise2.then((funny) => {
  //console.log(funny)
  console.log("Got url");
  urlfunny = funny;
  console.log("urlfunny found : ");
console.log(urlfunny);
})}
  })
    
  getVideoDurationInSeconds(urlfunny).then((duration) => {
          if(duration > 30 || urlfunny.substr(urlfunny.length-3, 3) != "mp4" || content.includes(urlfunny) == true)
        {
    console.log("> 30 sec, find another... (4)")
const promise2 = Promise.resolve(event);
promise2.then((funny) => {
  //console.log(funny)
  console.log("Got url");
  urlfunny = funny;
  console.log("urlfunny found : ");
console.log(urlfunny);
})}
  })

  getVideoDurationInSeconds(urlfunny).then((duration) => {
          if(duration > 30 || urlfunny.substr(urlfunny.length-3, 3) != "mp4" || content.includes(urlfunny) == true)
        {
    console.log("> 30 sec, find another... (4)")
const promise2 = Promise.resolve(event);
promise2.then((funny) => {
  //console.log(funny)
  console.log("Got url");
  urlfunny = funny;
  console.log("urlfunny found : ");
console.log(urlfunny);
})}
  })

  getVideoDurationInSeconds(urlfunny).then((duration) => {
          if(duration > 30 || urlfunny.substr(urlfunny.length-3, 3) != "mp4" || content.includes(urlfunny) == true)
        {
    console.log("> 30 sec, find another... (4)")
const promise2 = Promise.resolve(event);
promise2.then((funny) => {
  //console.log(funny)
  console.log("Got url");
  urlfunny = funny;
  console.log("urlfunny found : ");
console.log(urlfunny);
})}
  })

  getVideoDurationInSeconds(urlfunny).then((duration) => {
          if(duration > 30 || urlfunny.substr(urlfunny.length-3, 3) != "mp4" || content.includes(urlfunny) == true)
        {
    console.log("> 30 sec, find another... (5)")
const promise2 = Promise.resolve(event);
promise2.then((funny) => {
  //console.log(funny)
  console.log("Got url");
  urlfunny = funny;
  console.log("urlfunny found : ");
console.log(urlfunny);
})}
  })
    
  getVideoDurationInSeconds(urlfunny).then((duration) => {
          if(duration > 30 || urlfunny.substr(urlfunny.length-3, 3) != "mp4" || content.includes(urlfunny) == true)
        {
    console.log("> 30 sec, find another... (6)")
const promise2 = Promise.resolve(event);
promise2.then((funny) => {
  //console.log(funny)
  console.log("Got url");
  urlfunny = funny;
  console.log("urlfunny found : ");
console.log(urlfunny);
})}
  })

  getVideoDurationInSeconds(urlfunny).then((duration) => {
          if(duration > 30 || urlfunny.substr(urlfunny.length-3, 3) != "mp4" || content.includes(urlfunny) == true)
        {
    console.log("> 30 sec, find another... (7)")
const promise2 = Promise.resolve(event);
promise2.then((funny) => {
  //console.log(funny)
  console.log("Got url");
  urlfunny = funny;
  console.log("urlfunny found : ");
console.log(urlfunny);
})}
  })
    
  getVideoDurationInSeconds(urlfunny).then((duration) => {
          if(duration > 30 || urlfunny.substr(urlfunny.length-3, 3) != "mp4" || content.includes(urlfunny) == true)
        {
    console.log("> 30 sec, find another... (8)")
const promise2 = Promise.resolve(event);
promise2.then((funny) => {
  //console.log(funny)
  console.log("Got url");
  urlfunny = funny;
  console.log("urlfunny found : ");
console.log(urlfunny);
})}
  })
    
  getVideoDurationInSeconds(urlfunny).then((duration) => {
          if(duration > 30 || urlfunny.substr(urlfunny.length-3, 3) != "mp4" || content.includes(urlfunny) == true)
        {
    console.log("> 30 sec, find another... (9)")
const promise2 = Promise.resolve(event);
promise2.then((funny) => {
  //console.log(funny)
  console.log("Got url");
  urlfunny = funny;
  console.log("urlfunny found : ");
console.log(urlfunny);
})}
  })
    
  getVideoDurationInSeconds(urlfunny).then((duration) => {
          if(duration > 30 || urlfunny.substr(urlfunny.length-3, 3) != "mp4" || content.includes(urlfunny) == true)
        {
    console.log("> 30 sec, find another... (10)")
const promise2 = Promise.resolve(event);
promise2.then((funny) => {
  //console.log(funny)
  console.log("Got url");
  urlfunny = funny;
  console.log("urlfunny found : ");
console.log(urlfunny);
})}
  })
    
  })
})
        }
})
       next_post_url = urlfunny;
     }

  if(content.includes(urlfunny) == false)
    {
  fs.appendFile('already.txt', urlfunny + "\n", function(err, result) {
     if(err) console.log('error', err);
    console.log("Url added in already.txt = " + urlfunny)
    
   });
    }
 });
       
  
/////////////////////////////

  var enddl = 0;
const path = require('path');
const axios = require('axios').default;

    const fileUrl = urlfunny;
    const downloadFolder = __dirname + '/assets/';
// fileUrl: the absolute url of the image or video you want to download
// downloadFolder: the path of the downloaded file on your machine
const downloadFile = async (fileUrl, downloadFolder) => {
  // Get the file name
  const fileName = 'video.mp4'; //Save as video.mp4

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
      enddl = 1;
    });
  } catch (err) { 
    FindMedia();
  }
}; 
 const VIDEO_URL = urlfunny;
  next_post_url = urlfunny;
downloadFile(VIDEO_URL, 'assets');
  })
  
} catch(error){
  FindMedia();
}
    }
  
  function SendMedia()
  {
        try
          {
console.log("start posting")
const Twitter = require("twitter")
const dotenv = require("dotenv")
const fs = require("fs")
dotenv.config()
        
/////////////////////////////
    
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const pathToFile = __dirname + '/assets/video.mp4'
const mediaType = "video/mp4"

const mediaData = fs.readFileSync(pathToFile)
const mediaSize = fs.statSync(pathToFile).size

if(save_random_number == 0)
  {
initializeMediaUpload()
  .then(appendFileChunk)
  .then(finalizeUpload)
  .then(publishStatusUpdate0)
  }
        else if(save_random_number == 1)
          {
initializeMediaUpload()
  .then(appendFileChunk)
  .then(finalizeUpload)
  .then(publishStatusUpdate1)
          }
        else if(save_random_number == 2)
          {
initializeMediaUpload()
  .then(appendFileChunk)
  .then(finalizeUpload)
  .then(publishStatusUpdate2)
          }
        else if(save_random_number == 3)
          {
initializeMediaUpload()
  .then(appendFileChunk)
  .then(finalizeUpload)
  .then(publishStatusUpdate3)
          }
        else if(save_random_number == 4)
          {
initializeMediaUpload()
  .then(appendFileChunk)
  .then(finalizeUpload)
  .then(publishStatusUpdate4)
          }
        else if(save_random_number == 5)
          {
initializeMediaUpload()
  .then(appendFileChunk)
  .then(finalizeUpload)
  .then(publishStatusUpdate5)
          }
        else if(save_random_number == 6)
          {
initializeMediaUpload()
  .then(appendFileChunk)
  .then(finalizeUpload)
  .then(publishStatusUpdate6)
          }
        else
          {
            initializeMediaUpload()
  .then(appendFileChunk)
  .then(finalizeUpload)
  .then(publishStatusUpdate5)
          }

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
        old_date = new Date();
        console.log("Successfully uploaded media and tweeted!")
        resolve(data)
      }
    })
  })
}
        
function publishStatusUpdate0(mediaId) {
  return new Promise(function(resolve, reject) {
    client.post("statuses/update", {
      status: "😲 Unexpected video", //Message
      media_ids: mediaId
    }, function(error, data, response) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        old_date = new Date();
        console.log("Successfully uploaded media and tweeted!")
        resolve(data)
      }
    })
  })
}

function publishStatusUpdate1(mediaId) {
  return new Promise(function(resolve, reject) {
    client.post("statuses/update", {
      status: "🤣 Funny video", //Message
      media_ids: mediaId
    }, function(error, data, response) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        old_date = new Date();
        console.log("Successfully uploaded media and tweeted!")
        resolve(data)
      }
    })
  })
}

function publishStatusUpdate2(mediaId) {
  return new Promise(function(resolve, reject) {
    client.post("statuses/update", {
      status: "🙄 There was an attempt", //Message
      media_ids: mediaId
    }, function(error, data, response) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        old_date = new Date();
        console.log("Successfully uploaded media and tweeted!")
        resolve(data)
      }
    })
  })
}

function publishStatusUpdate3(mediaId) {
  return new Promise(function(resolve, reject) {
    client.post("statuses/update", {
      status: "⚡ Dank Video", //Message
      media_ids: mediaId
    }, function(error, data, response) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        old_date = new Date();
        console.log("Successfully uploaded media and tweeted!")
        resolve(data)
      }
    })
  })
}
                
function publishStatusUpdate4(mediaId) {
  return new Promise(function(resolve, reject) {
    client.post("statuses/update", {
      status: "💩 Shit Posting", //Message
      media_ids: mediaId
    }, function(error, data, response) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        old_date = new Date();
        console.log("Successfully uploaded media and tweeted!")
        resolve(data)
      }
    })
  })
}
                

function publishStatusUpdate5(mediaId) {
  return new Promise(function(resolve, reject) {
    client.post("statuses/update", {
      status: "👽 Unusual video", //Message
      media_ids: mediaId
    }, function(error, data, response) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        old_date = new Date();
        console.log("Successfully uploaded media and tweeted!")
        resolve(data)
      }
    })
  })
}
                
function publishStatusUpdate6(mediaId) {
  return new Promise(function(resolve, reject) {
    client.post("statuses/update", {
      status: "🚫 What Could Go Wrong", //Message
      media_ids: mediaId
    }, function(error, data, response) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        old_date = new Date();
        console.log("Successfully uploaded media and tweeted!")
        resolve(data)
      }
    })
  })
}
        wait(10000);
        FindMedia();
          }catch(error)
            {
              wait(10000);
              FindMedia();
            }
  }
  
      ( new CronJob( '*/5 * * * *', function() {
SendMedia();
  } ) ).start();
  
  ( new CronJob( '*/3 * * * *', function() {
  var new_date = new Date();
        if(old_date != null)
        {
              console.log(new_date.getHours())
              console.log(old_date.getHours())
              console.log(new_date.getHours() - old_date.getHours())
    if((new_date.getHours() - old_date.getHours() + 0.1) > 1)
      {
        SendMedia();
      }
        }
var ok = false;
var next_post_time;
  if(next_post_url != undefined)
    {
const { getVideoDurationInSeconds } = require('get-video-duration');
getVideoDurationInSeconds(next_post_url).then((duration) => {
      if(duration < 30 && duration >= 1)
        {
         if(next_post_url.substr(next_post_url.length-3, 3) == "mp4")
           {
             ok = true;
             console.log("Its ok !");
           }
        }
    if(ok == false)
      {
        console.log("Wasnt good, find another media")
        FindMedia();
      }
      else
        {
        console.log("Seems good, next post will be :")
        console.log(next_post_url)
        console.log(next_post_time)
        }
  })
          }

} ) ).start();
  
})
