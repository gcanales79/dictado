//var googleTTS = require('google-tts-api');
//var Speech = require('speak-tts');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');


module.exports = function (app) {

    /*app.post("/api/voice", function (req, res) {
        var text=req.body.text
        console.log(text)
        googleTTS(text, 'en', 1)   // speed normal = 1 (default), slow = 0.24
            .then(function (url) {
                console.log(url); // https://translate.google.com/translate_tts?...
                res.json(url)
            })
            .catch(function (err) {
                console.error(err.stack);
            });
    })*/

    /*app.post("/api/voice", function (req, res) {
        var text = req.body.text
        console.log(text)
        const speech = new Speech()
        speech.init().then((data) => {
            // The "data" object contains the list of available voices and the voice synthesis params
            console.log("Speech is ready, voices are available", data)
            res.json(data)
        }).catch(e => {
            console.error("An error occured while initializing : ", e)
        })
    })*/
    
    app.post("/api/voice", function (req, res) {
        //var text = req.body.text
        //console.log(text)
        // Creates a client
     ;
 
      quickStart(req.body.text).then((data) => {
            // The "data" object contains the list of available voices and the voice synthesis params
            
            res.json("./js/"+req.body.text+".mp3")
        }).catch(e => {
            console.error("An error occured while initializing : ", e)
        })
    })

}

async function quickStart(text) {
    const client = new textToSpeech.TextToSpeechClient()
    // The text to synthesize
    //const text = 'hey, world!';
    //const text=req.body.text;
    console.log(text)
    // Construct the request
    const request = {
      input: {text: text},
      // Select the language and SSML voice gender (optional)
      voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
      // select the type of audio encoding
      audioConfig: {audioEncoding: 'MP3'},
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('./public/js/'+text+".mp3", response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
    
  }


