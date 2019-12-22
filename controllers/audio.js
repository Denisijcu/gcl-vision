'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());




async function main(fileName) {
    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');
    const fs = require('fs');
  
    // Creates a client
    const client = new speech.SpeechClient();
  
    // The name of the audio file to transcribe
    //const fileName = './images/audio.raw';
  
    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');
  
    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: audioBytes,
    };
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    };
    const request = {
      audio: audio,
      config: config,
    };
  
    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
    return transcription;
  }
  






router.get('/audio', (req, res, next) => {
    res.render('audio');
   // res.send('Audio');
});

router.post('/audio', (req, res, next) => {
    /*
    let imageUrl = req.file.filename;
    let title = req.body.title;

    let picture = 'images/' + imageUrl;
    
    let etiquetas = quickstart(picture);
    */
    const fileName = 'images/'+req.file.filename;
    main(fileName)
        .then(info => {
            console.log(info);
            res.render('text', { text:info });
        })
        .catch(console.error)
    
   });
   


module.exports = router;
