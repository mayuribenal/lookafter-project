const express = require('express');
const bcrypt = require('./bcrypt');
const db = require('./db.js');
const s3 = require('./s3');
const config = require('./config');
var moment = require('moment');
var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');

var diskStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + '/uploads');
  },
  filename: function(req, file, callback) {
    uidSafe(24).then(function(uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

var uploader = multer({
  storage: diskStorage,
  limits: {
    fileSize: 2097152
  }
});

const app = express.Router();

app.get('/welcome', (req, res) => {
  if (req.session.userId) {
    res.redirect('/');
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

//REGISTRATION AND LOGIN

app.post('/register', async (req, res) => {
  try {
    const first = req.body.first.toLowerCase();
    const last = req.body.last.toLowerCase();
    const hood = req.body.hood.toLowerCase();
    const email = req.body.email.toLowerCase();
    const hash = await bcrypt.hash(req.body.password);
    const user = await db.registerUser(first, last, hood, email, hash);
    req.session.userId = user.rows[0].id;
    req.session.hood = req.body.hood;
    res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    res.json({});
  }
});

app.post('/login', async (req, res) => {
  try {
    const pass = await db.verifyPassword(req.body.email);
    const bool = await bcrypt.compare(req.body.password, pass.rows[0].password);
    if (bool == true) {
      req.session.userId = pass.rows[0].id;
      req.session.hood = data.rows[0].hood;
      res.json({
        success: true
      });
    } else {
      res.json({});
    }
  } catch (err) {
    console.log(err);
    res.json({});
  }
});

//GET USER

app.get('/user', async (req, res) => {
  try {
    const user = await db.getUser(req.session.userId);
    res.send({
      id: user.rows[0].id,
      first: user.rows[0].first,
      last: user.rows[0].last,
      hood: user.rows[0].hood,
      email: user.rows[0].email,
      pic: user.rows[0].img
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/members', async (req, res) => {
  try {
    const members = await db.getMembers();
    res.send(members.rows);
  } catch (err) {
    console.log(err);
  }
});

// POST PICTURE

app.post('/upload', uploader.single('file'), s3.upload, async (req, res) => {
  try {
    const pic = await db.addProfilePic(
      config.s3Url + req.file.filename,
      req.session.userId
    );
    res.send({
      pic: pic.rows[0].img
    });
  } catch (err) {
    console.log(err);
  }
});

//CALENDAR

app.get('/get-events', async (req, res) => {
  try {
    const events = await db.getEvents(req.session.hood);
    console.log('MY EVENTS rows:', events.rows);
    res.send(events.rows);
  } catch (err) {
    console.log(err);
  }
});

app.post('/book-studio', async (req, res) => {
  var now = moment().format('D MMM YYYY kk:mm');
  if (moment(req.body.start).isBefore(now)) {
    res.send({
      response: 'No bookings in the past allowed'
    });
  } else {
    try {
      const hood = await db.gethood(req.session.userId);
      const start = moment(req.body.start).format();
      const end = moment(req.body.end).format();
      const addEv = await db.addEvent(
        req.session.userId,
        hood.rows[0].hood,
        req.body.title,
        start,
        end
      );
      res.send(addEv.rows);
    } catch (err) {
      console.log(err);
      res.send({
        error: 'error in updating claendar'
      });
    }
  }
});

app.post('/remove-event', async (req, res) => {
  const hood = await db.gethood(req.session.userId);
  if (hood.rows[0].hood == req.body.hood) {
    db.removeEvent(req.body.id)
      .then(() => {
        res.send({
          removed: true
        });
      })
      .catch(err => console.log(err));
  } else {
    res.send({
      response: "Sorry, you can't remove this event"
    });
  }
});

//LOGOUT

app.get('/logout', (req, res) => {
  req.session.userId = null;
  res.redirect('/welcome#/');
});

app.get('*', function(req, res) {
  if (!req.session.userId) {
    res.redirect('/welcome');
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

module.exports = app;
