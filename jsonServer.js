/**
 *  @author: Isaac Vega Rodriguez          <isaacvega1996@gmail.com>
 **/

'use strict';

var express = require('express');
var fs      = require('fs');
var glob    = require('glob');

var app = express();

var APP_PORT = 80;

var BASE_DIR = './api.meetups.com';

app.use(express.static(__dirname));

var ROUTES = [
  {
    url : '/',
    file : 'index.html'
  },
  {
    url : '/events',
    file : 'events.html'
  },
  {
    url : '/aboutUs',
    file : 'aboutUs.html'
  },
  {
    url : '/contactUs',
    file : 'contactUs.html'
  },
];

for (var i = 0; i < ROUTES.length; i += 1) {
  (function() {
    var rt = ROUTES[i];
    app.get(rt.url, function(req, res) {
      res.sendFile(rt.file, {
        root : __dirname
      });
    });
  })();
}

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
    return res.status(400).jsonp({
      results : []
    });
  } else {

    fs.readFile(BASE_DIR + '/events/' + req.query.status + '.json', function(err, data) {

      if ( err ) {
        return res.status(404).jsonp({
          results : []
        });
      }

      var jsonData = JSON.parse(data.toString());

      return res.status(200).jsonp(jsonData);

    });

  }

});

app.get('/api/events/:id/photos', function(req, res) {

  //console.log(req.params.id);

  var pref = BASE_DIR + '/event_photos/';

  var models = glob.sync(pref + req.params.id + '/*.jpg');

  models = models.map(function(e) {

    var aux = e.substring(pref.length, e.length);

    aux = aux.split('/');

    //  api events :id photo :photoName

    return '/api/events/' + aux[0] + '/photo/' + aux[1];

  });

  //console.log(models);

  return res.status(200).jsonp(models);

});

app.get('/api/events/:id/photo/:photoName', function(req, res) {

  ///console.log(req.url);

  var __path = decodeURI(req.url.toString()).split('/');

  //console.log(__path);

  __path = [
    __path[3],
    __path[5],
  ].join('/');

  var photoPath = BASE_DIR + '/event_photos/' + __path;

  //console.log(photoPath);

  if ( fs.existsSync( photoPath ) === true ) {

    return res.status(200).sendFile(photoPath, {
      root : __dirname
    });

  } else {

    console.log('No existe el fichero');

    return res.status(404).jsonp([]);
  }

  //var models = glob.sync(BASE_DIR + '/event_photos/' + req.params.id + '/*.jpg');

});

app.get('/api/events/:id/attachments', function(req, res) {

  //console.log(req.params.id);

  var pref = BASE_DIR + '/event_attachments/';

  var models = glob.sync(pref + req.params.id + '/*.*');

  //console.log(models);

  models = models.map(function(e) {

    var aux = e.substring(pref.length, e.length);

    aux = aux.split('/');

    return '/api/events/' + aux[0] + '/attachment/' + aux[1];

  });

  //console.log(models);

  return res.status(200).jsonp(models);

});

app.get('/api/events/:id/agenda', function(req, res) {

  //console.log(req.params.id);

  var pref = BASE_DIR + '/event_agenda/';

  var models = glob.sync(pref + req.params.id + '.json');

  var result = [];

  if ( models.length > 0 ) {
    result = require(models[0]);
  }

  return res.status(200).jsonp(result);

});

app.get('/api/events/:id/attachment/:name', function(req, res) {

  ///console.log(req.url);

  var __path = decodeURI(req.url.toString()).split('/');

  //console.log(__path);

  __path = [
    __path[3],
    __path[5],
  ].join('/');

  var photoPath = BASE_DIR + '/event_attachments/' + __path;

  //console.log(photoPath);

  if ( fs.existsSync( photoPath ) === true ) {

    return res.status(200).sendFile(photoPath, {
      root : __dirname
    });

  } else {

    console.log('No existe el fichero', __path);

    return res.status(404).jsonp([]);
  }

  //var models = glob.sync(BASE_DIR + '/event_photos/' + req.params.id + '/*.jpg');

});

app.get('/api/members', function(req, res) {

  fs.readFile(BASE_DIR + '/members/members.json', function(err, data) {

    if ( err ) {
      return res.status(404).jsonp({
        results : []
      });
    }

    var jsonData = JSON.parse(data.toString());

    return res.status(200).jsonp(jsonData);

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
          return res.status(500).jsonp({
            results : []
          });
        }

        var jsonData = JSON.parse(data.toString());

        return res.jsonp(jsonData);

      });

    } else {

      //console.log('FILE DOES NOT EXISTS');

      return res.status(404).jsonp({
        results : []
      });

    }

  } else {

    //console.log('MISSING HEADER');

    return res.status(400).json({
      results : []
    });

  }

});

app.get('/api/photos', function(req, res) {

  //console.log(req.query);

  if ( !!req.query.photo_id ) {

    //console.log("EVENT_ID EXISTS: ", req.query.event_id);

    var fileDir = BASE_DIR + '/photos/highres_' + req.query.photo_id + '.jpeg';

    //console.log('FILE_DIR: ', fileDir);

    if ( fs.existsSync(fileDir) === true ) {

      console.log('FILE EXISTS');

      return res.sendFile(fileDir, {
        root : __dirname
      });

    } else {

      return res.sendFile('./img/8.png', {
        root : __dirname
      });

    }

  } else {
    return res.sendFile('./img/8.png', {
      root : __dirname
    });
  }

});

app.listen(APP_PORT, function() {

  console.log('Server listening at http://localhost:' + APP_PORT);

});