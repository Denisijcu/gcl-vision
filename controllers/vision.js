'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());


let imageUrl = 'images/shakira.jpg';
let title = '';

async function quickstart(imageUrl) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: path.join(__dirname, '../keyfile.json')
    });
  
    let title = 'picture';
    // Performs label detection on the image file
    const [result] = await client.labelDetection(imageUrl);
    const labels = result.labelAnnotations;
    console.log('Labels:');
    let data = [];
    labels.forEach(label => {
        // console.log(label.description);
        data.push(label);
    });
    
   
    return data; 
}

let etiquetas = quickstart(imageUrl);
router.get('/vision', (req, res, next) => {
    res.render('vision', { imageUrl, title, etiquetas });
});

router.get('/detail', (req, res, next) => {
    res.send('<h1>Detail</h1>');
});


router.post('/vision', (req, res, next) => {
 
    let imageUrl = req.file.filename;
    let title = req.body.title;

    let picture = 'images/' + imageUrl;
    
    let etiquetas = quickstart(picture);
    etiquetas.then(info => {
        res.render('detail', { imageUrl, title, etiquetas:info });
    })
    
   });
   
    
module.exports = router;


