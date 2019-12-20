'use strict';

const path = require('path');
const express = require('express');
//const config = require('./config');
    
const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const app = express();


app.disable('etag');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);

app.use(multer({storage: fileStorage}).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

app.use('/', require('./controllers/home'));
app.get('/about', require('./controllers/about'));
app.get('/vision', require('./controllers/vision'));
app.post('/vision', require('./controllers/vision'));

/*
app.get('/about', (req, res, next) => {
    //res.render('about');
    res.send('<h1>About works </h1>');
});
*/


app.get('/', (req, res) => {
 res.redirect('/');
 //res.send('Hello');
});


app.use((req, res) => {
  res.status(404).send('Not Found');
});


app.use((err, req, res) => {
  console.error(err);
  res.status(500).send(err.response || 'Something broke!');
});

const PORT = 8081;
if (module === require.main) {
  const server = app.listen(PORT, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}

module.exports = app;
