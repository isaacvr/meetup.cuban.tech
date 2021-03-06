/**
 *  @author: Isaac Vega Rodriguez          <isaacvega1996@gmail.com>
 **/

'use strict';

var express = require('express');
var fs      = require('fs');
var glob    = require('glob');
var mime    = require('mime');

var app = express();

var APP_PORT = 80;
var IS_YOUTUBE = false;

var BASE_DIR = './api.meetups.com';

var ROOT = __dirname;

app.use(express.static(ROOT));

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
  {
    url : '/userInfo',
    file : 'form.html'
  },
];

for (var i = 0; i < ROUTES.length; i += 1) {
  (function() {
    var rt = ROUTES[i];
    app.get(rt.url, function(req, res) {
      res.sendFile(rt.file, {
        root : ROOT
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

  var models = glob.sync(pref + req.params.id + '/*.*');

  models = models
    .filter(function(e) {
      return /^image/i.test( mime.lookup(e) );
    })
    .map(function(e) {

      var aux = e.substring(pref.length, e.length);
      aux = aux.split('/');

      return {
        url : '/api/events/' + aux[0] + '/photo/' + aux[1],
        mime : mime.lookup(e)
      };

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
      root : ROOT
    });

  } else {

    //console.log('No existe el fichero');

    return res.status(404).jsonp([]);
  }

  //var models = glob.sync(BASE_DIR + '/event_photos/' + req.params.id + '/*.jpg');

});

app.get('/api/video/:videoName', function(req, res) {

  var pref = BASE_DIR + '/event_videos/';

  var videoPath = pref + req.params.videoName;

  var reg = new RegExp(req.params.videoName);

  var models = glob.sync(pref + '*.*');

  console.log(models);

  models = models.filter(function(e) {
    e = e.replace(/\./g, '\\.');
    return reg.test(e);
  });

  if ( models.length > 0 ) {

    console.log(models[0]);

    //console.log('EXISTE EL VIDEO');

    return res.status(200).sendFile(models[0], {
      root : ROOT
    });

  } else {

    //console.log('No existe el fichero');

    return res.status(404).jsonp([]);
  }

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

  var result = {
    agenda : [],
    youtube : IS_YOUTUBE
  };

  if ( models.length > 0 ) {
    result.agenda = require(models[0]);
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
      root : ROOT
    });

  } else {

    //console.log('No existe el fichero', __path);

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

      //console.log('FILE EXISTS');

      return res.sendFile(fileDir, {
        root : ROOT
      });

    } else {

      return res.sendFile('./img/8.png', {
        root : ROOT
      });

    }

  } else {
    return res.sendFile('./img/8.png', {
      root : ROOT
    });
  }

});

app.listen(APP_PORT, function() {

  console.log('Server listening at http://localhost:' + APP_PORT);

});