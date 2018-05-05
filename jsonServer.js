/**
 *  @author: Isaac Vega Rodriguez          <isaacvega1996@gmail.com>
 **/

'use strict';

var express = require('express');
var fs      = require('fs');

var app = express();

var APP_PORT = 80;

var BASE_DIR = './api.meetups.com';

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile('index.html', {
    root : __dirname
  });
});

app.get('/events', function(req, res) {
  res.sendFile('events.html', {
    root : __dirname
  });
});

app.get('/aboutUs', function(req, res) {
  res.sendFile('aboutUs.html', {
    root : __dirname
  });
});

app.get('/contactUs', function(req, res) {
  res.sendFile('contactUs.html', {
    root : __dirname
  });
});


app.get('/api/events', function(req, res) {

  var options = [
    "cancelled",
    "draft",
    "past",
    "proposed",
    "suggested",
    "upcoming"
  ];

  //console.log(req.route);

  if ( options.indexOf( req.query.status ) == -1 ) {
    return res.json({
      results : []
    });
  } else {

    fs.readFile(BASE_DIR + '/events/' + req.query.status + '.json', function(err, data) {

      if ( err ) {
        return res.json({
          results : []
        });
      }

      var jsonData = JSON.parse(data.toString());

      return res.json(jsonData);

    });

  }

});

app.get('/api/members', function(req, res) {

  fs.readFile(BASE_DIR + '/members/members.json', function(err, data) {

    if ( err ) {
      return res.json({
        results : []
      });
    }

    var jsonData = JSON.parse(data.toString());

    return res.json(jsonData);

  });

});

app.get('/api/comments', function(req, res) {

  if ( !!req.query.event_id ) {

    //console.log("EVENT_ID EXISTS: ", req.query.event_id);

    var fileDir = BASE_DIR + '/comments/' + req.query.event_id + '.json';

    //console.log('FILE_DIR: ', fileDir);

    if ( fs.existsSync(fileDir) === true ) {

      //console.log('FILE EXISTS');

      fs.readFile(fileDir, function(err, data) {

        if ( err ) {
          return res.json({
            results : []
          });
        }

        var jsonData = JSON.parse(data.toString());

        return res.json(jsonData);

      });

    } else {

      //console.log('FILE DOES NOT EXISTS');

      return res.json({
        results : []
      });

    }

  } else {

    //console.log('MISSING HEADER');

    return res.json({
      results : []
    });

  }

});

app.get('/api/photos', function(req, res) {

  console.log(req.query);

  if ( !!req.query.photo_id ) {

    //console.log("EVENT_ID EXISTS: ", req.query.event_id);

    var fileDir = BASE_DIR + '/photos/highres_' + req.query.photo_id + '.jpeg';

    console.log('FILE_DIR: ', fileDir);

    if ( fs.existsSync(fileDir) === true ) {

      //console.log('FILE EXISTS');

      fs.readFile(fileDir, function(err, data) {

        if ( err ) {
          return res.status(404).end();
        }

        return res.end(data);

      });

    } else {
      return res.status(404).end();
    }

  } else {
    return res.status(400).end();
  }

});

app.listen(APP_PORT, function() {

  console.log('Server listening at http://localhost:' + APP_PORT);

});