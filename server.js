console.log('Server-side code running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// serve files from the public directory
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to the db and start the express server
let db;

// ***Replace the URL below with the URL for your database***
const url =  'mongodb://localhost:27017/data';
// E.g. for option 2) above this will be:
// const url =  'mongodb://localhost:21017/databaseName';

MongoClient.connect(url, (err, database) => {
  if(err) {
    return console.log(err);
  }
  db=database;
  // start the express web server listening on 8080
  app.listen(8080, () => {
    console.log('listening on 8080');
  });
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/event-details.html');
});

app.get('/goals', (req, res) => {
  res.sendFile(__dirname + '/goals.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login1-form.html');
});

app.get('/sign-up', (req, res) => {
  res.sendFile(__dirname + '/sign-up.html');
});

app.get('/member', (req, res) => {
  res.sendFile(__dirname + '/memberperpage.html');
});

app.get('/events', (req, res) => {
  res.sendFile(__dirname + '/events.html');
});

app.get('/core', (req, res) => {
  res.sendFile(__dirname + '/mainpage.html');
});

// add a document to the DB collection recording the click event
app.post('/register', (req, res) => {
  console.log(req.body);
  var userDetail = req.body;
  
    db.collection('UserDetail').save(userDetail, (err, result) => {
      if (err) {
        return console.log(err);
      }
      console.log('click added to db');
      res.sendStatus(201);
    });
  });

  
  // get the click data from the database
app.post('/login', (req, res) => {
  console.log(req.body);
  var userDetail = req.body;

  db.collection('UserDetail').find(
      {
        userName: userDetail.userName,
        userPassword: userDetail.userPassword,
        userEmail: userDetail.userEmail
      }).toArray((err, result) => {
    if (err)
    { 
      res.send(err);
    }
    else
    {
      res.send(result);
    }
  });
});
