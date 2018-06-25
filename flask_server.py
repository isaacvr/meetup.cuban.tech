#
# @author: Isaac Vega Rodriguez          <isaacvega1996@gmail.com>
#

import os
import glob
from flask import Flask, request, send_from_directory, json
from flask.ext.pymongo import PyMongo

IS_YOUTUBE = False

BASE_DIR = './api.meetups.com';

app = Flask(__name__)
app.config['MONGO_URI'] = open('Config/database.txt', 'r').read()

# Basic requests handlers

@app.route('/js/<path:path>')
def __jsFiles(path):
  return send_from_directory('js', path);

@app.route('/css/<path:path>', methods=['GET'])
def __cssFiles(path):
  return send_from_directory('css', path);

@app.route('/templates/<path:path>', methods=['GET'])
def __templateFiles(path):
  return send_from_directory('templates', path);

@app.route('/fonts/<path:path>', methods=['GET'])
def __fontsFiles(path):
  return send_from_directory('fonts', path);

@app.route('/img/<path:path>', methods=['GET'])
def __imgFiles(path):
  return send_from_directory('img', path);

@app.route('/translations/<path:path>', methods=['GET'])
def __translationsFiles(path):
  return send_from_directory('translations', path);

@app.route('/forms/<path:path>', methods=['GET'])
def __formFiles(path):
  return send_from_directory('forms', path);

# Routes

@app.route('/', methods=['GET'])
def index():
  return send_from_directory('', 'index.html')

@app.route('/events', methods=['GET'])
def _events():
  return send_from_directory('', 'events.html')

@app.route('/aboutUs', methods=['GET'])
def _aboutUs():
  return send_from_directory('', 'aboutUs.html')

@app.route('/contactUs', methods=['GET'])
def _contactUs():
  return send_from_directory('', 'contactUs.html')

@app.route('/userInfo', methods=['GET'])
def _userInfo():
  return send_from_directory('', 'form.html')

# API

#---------------------------------------------------------------------------------

@app.route('/api/events', methods=['GET'])
def _eventsHandler():

  options = [
    "cancelled",
    "draft",
    "past",
    "proposed",
    "suggested",
    "upcoming"
  ]

  for arg, val in request.args.iteritems():
    if arg == 'status':
      if val in set(options):
        return send_from_directory(BASE_DIR + '/events/', val + '.json');

  return json.jsonify([])



#---------------------------------------------------------------------------------

def _filterImage(img):

  extList = [
    "bmp", "cgm", "g3", "gif", "ief", "jpeg", "jpg", "jpe",
    "ktx", "png", "btif", "sgi", "svg", "svgz", "tif", "tiff",
    "psd", "uvi", "uvvi", "uvg", "uvvg", "djv", "djvu", "sub",
    "dwg", "dxf", "fbs", "fpx", "fst", "mmr", "rlc", "mdi", "wdp",
    "npx", "wbmp", "xif", "webp", "3ds", "ras", "cmx", "fh", "fhc",
    "fh4", "fh5", "fh7", "ico", "jng", "sid", "bmp", "pcx", "pic",
    "pct", "pnm", "pbm", "pgm", "ppm", "rgb", "tga", "xbm", "xpm", "xwd"
  ]

  parts = img.split('.')
  size = len(parts)

  if size >= 1:

    conj = set(extList)

    return parts[ size - 1 ] in conj

  else:
    return False


@app.route('/api/events/<id>/photos', methods=['GET'])
def __eventPhotosHandler(id):

  # print id

  pref = BASE_DIR + '/event_photos/'

  models = glob.glob(pref + id + '/*.*')

  models = filter(_filterImage, models)

  res = []

  for md in models:
    # print md

    aux = md[ len(pref) : ]

    # print aux

    aux = aux.split('/')

    res.append({
      'url' : '/api/events/' + aux[0] + '/photo/' + aux[1],
      'mime' : 'image/jpeg'
    });

  # print res

  return json.jsonify(res)


#---------------------------------------------------------------------------------

@app.route('/api/events/<id>/photo/<photoName>', methods=['GET'])
def _eventPhotoByNameHandler(id, photoName):

  photoPath = BASE_DIR + '/event_photos/' + id;

  # print photoPath
  # print os.path.isfile( photoPath + '/' + photoName )

  if os.path.isfile( photoPath + '/' + photoName ):
    return send_from_directory(photoPath, photoName)
  else:
    print 'File not found'
    return json.jsonify([])


#---------------------------------------------------------------------------------

@app.route('/api/video/<videoName>', methods=['GET'])
def _videoByNameHandler(videoName):

  pref = BASE_DIR + '/event_videos/'

  videoPath = pref + videoName

  reg = r'' + videoName

  models = glob.glob(pref + '*.*')

  for md in models:
    if len( md ) > len( md.replace( videoName, '' ) ):
      return send_from_directory('', md)

  response = app.make_response('')

  response.status_code = 404

  return response


#---------------------------------------------------------------------------------

@app.route('/api/events/<id>/attachments', methods=['GET'])
def _eventsAttachmentsHandler(id):

  pref = BASE_DIR + '/event_attachments/'

  models = glob.glob(pref + id + '/*.*')

  res = []

  for md in models:

    aux = md[ len(pref) : ]

    aux = aux.split('/')

    res.append('/api/events/' + aux[0] + '/attachment/' + aux[1])

  return json.jsonify(res)


#---------------------------------------------------------------------------------

@app.route('/api/events/<id>/agenda', methods=['GET'])
def _eventsAgendaHandler(id):

  pref = BASE_DIR + '/event_agenda/'

  models = glob.glob(pref + id + '.json')

  result = {
    "agenda" : [],
    "youtube" : IS_YOUTUBE
  }

  if len(models) > 0:
    result["agenda"] = json.load( open(models[0], 'r') )

  return json.jsonify(result)


#---------------------------------------------------------------------------------

@app.route('/api/events/<id>/attachment/<name>', methods=['GET'])
def _eventsAttachmentByNameHandler(id, name):

  photoPath = BASE_DIR + '/event_attachments/' + id + '/' + name

  if os.path.isfile( photoPath ):
    return send_from_directory('', photoPath)
  else:
    return json.jsonify([])


#---------------------------------------------------------------------------------

@app.route('/api/members', methods=['GET'])
def _membersHandler():

  try:
    return send_from_directory('', BASE_DIR + '/members/members.json')
  except IOError:
    return  json.jsonify({
      "results" : []
    })


#---------------------------------------------------------------------------------

@app.route('/api/comments', methods=['GET'])
def _commentsHandler():

  for arg, val in request.args.iteritems():
    if arg == 'event_id':

      fileDir = BASE_DIR + '/comments/' + val + '.json'

      if os.path.isfile( fileDir ):
        try:
          return send_from_directory('', fileDir)
        except IOError:
          response = app.make_response('')
          response.status_code = 500;
          return response
      else:
        response = app.make_response('')
        response.status_code = 404;
        return response

  response = app.make_response('')
  response.status_code = 400;
  return response


#---------------------------------------------------------------------------------

@app.route('/api/photos', methods=['GET'])
def _photosHandler():

  for arg, val in request.args.iteritems():
    if arg == 'photo_id':

      fileDir = BASE_DIR + '/photos/highres_' + val + '.jpeg'

      if os.path.isfile( fileDir ):
        try:
          return send_from_directory('', fileDir)
        except IOError:
          response = app.make_response('')
          response.status_code = 500;
          return response
      else:
        return send_from_directory('./img/', '8.png')

  return send_from_directory('./img/', '8.png')


#---------------------------------------------------------------------------------

@app.route('/submitForm', methods=['POST'])
def _submitFormHandler():

  mongo = PyMongo(app)

  if 'data' in request.form:
    data = json.loads( request.form['data'] )
    mongo.db.forms.insert(data)

  return ''


#---------------------------------------------------------------------------------

# Run the server

if __name__=='__main__':
  app.run(debug=True)