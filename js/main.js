/**
 *  @author: Isaac Vega Rodriguez          <isaacvega1996@gmail.com>
 */
'use strict';

///                               *** ANGULAR STUFF ***

var myApp = angular.module('cubantech', ['ngAnimate', 'ngSanitize']);

myApp
  .controller('cubantechController', [
    '$scope',
    '$http',
    '$window',
    '$sce',
    function($scope, $http, $window, $sce) {

      var MEETUP_API_KEY = "18714117384a2a953663a721a636238";

      var ROUTE = 'translations/';

      $scope.COLORS = [
        "#ef5350",
        "#4db6ac",
        "#ff7043",
        "#ffee58",
        "#4fc3f7",
        "#4caf50",
        "#9575cd"
      ];

      $scope.STARS_DESCRIPTORS = [
        'fa fa-star-o',
        'fa fa-star-half-o',
        'fa fa-star'
      ];

      $scope.DEFAULT_AVATAR = 'img/8.png';

      $scope.eventGroups = [];

      $scope.detailEvent = {};

      $scope.location = $window.location;

      /// Lenguaje de preferencia
      $scope.preferedLanguage = 'en';

      /// Lenguaje seleccionado actualmente (inicialmente el preferido)
      $scope.lang             = $scope.preferedLanguage;

      /// Año actual
      $scope.thisYear         = (new Date()).getFullYear();

      /// Lista con los lenguajes cargados
      $scope.loadedLanguages  = {};

      /// Escritura correcta de cada lenguaje
      $scope.langMap = {
        en : "English",
        gb : "English",
        es : "Español",
        pt : "Português",
        fr : "Français"
      };

      $scope.general = {};

      /// Lista de lenguajes disponibles
      //$scope.langList = [ "en", "es" ];
      $scope.langList = [ "en" ];

      $scope.visual =  {
        marketing : {
          height : "350px",
          display : "grid"
        }
      };

      /// TODO: Test this and store key in another place!!!
      $scope.getComments = function getComments(group) {

        var __fetch = function(ev) {

          $http
            .get('/api/comments', {
              params : {
                "event_id" : ev.id,
                "key" : MEETUP_API_KEY
              }
            })
            .success(function(data) {

              //console.log('COMMENTS V2 LIST: ', data);

              //$scope.$apply(function() {

                ev.commentList = data.results;

                for (var i = 0; i < ev.commentList.length; i += 1) {

                  //console.log('HELLO', ev.commentList[i]);

                  if ( !!ev.commentList[i].member_id ) {
                    ev.commentList[i].img = '/api/photos?photo_id=' + ev.commentList[i].member_id;
                  } else {
                    ev.commentList[i].img = $scope.DEFAULT_AVATAR;
                  }

                }

                $scope.processEvent(ev);

              //});

            })
            .error(function(err) {
              //console.log('getComments ERROR: ', err);
            });

        };

        for (var i = 0; i < group.eventList.length; i += 1) {
          __fetch( group.eventList[i] );
        }

      };

      $scope.getEventAttachments = function getEventAttachments(group) {

        var __fetch = function(ev) {

          $http
            .get('/api/events/' + ev.id + '/attachments/', {
              params : {
                "key" : MEETUP_API_KEY
              }
            })
            .success(function(data) {

              ev.attachments = [];

              for ( var i = 0; i < data.length; i += 1 ) {

                var ext = data[i].split('.');
                var name = data[i].split('/');

                ext = ext[ ext.length - 1 ];
                name = name[ name.length - 1 ];

                ev.attachments.push({
                  url : data[i],
                  name : name,
                  extension : ext
                });

              }

            })
            .error(function(err) {
              //console.log('getComments ERROR: ', err);
            });

        };

        for (var i = 0; i < group.eventList.length; i += 1) {
          __fetch( group.eventList[i] );
        }

      };

      $scope.getEventPhotos = function getEventPhotos(group) {

        var __fetch = function(ev) {

          $http
            .get('/api/events/' + ev.id + '/photos/', {
              params : {
                "key" : MEETUP_API_KEY
              }
            })
            .success(function(data) {

              //console.log('Photos: ', data);

              ev.photos = data;

              if ( data.length > 0 ) {

                setTimeout(function() {
                  $('#gallery_' + ev.id).lightGallery();
                }, 500);

              }

            })
            .error(function(err) {
              ///console.log('getComments ERROR: ', err);
            });

        };

        for (var i = 0; i < group.eventList.length; i += 1) {
          __fetch( group.eventList[i] );
        }

      };

      $scope.getEventAgenda = function getEventAgenda(group) {

        var __fetch = function(ev) {

          $http
            .get('/api/events/' + ev.id + '/agenda/', {
              params : {
                "key" : MEETUP_API_KEY
              }
            })
            .success(function(data) {
              ev.agenda = data;
            })
            .error(function(err) {
            });

        };

        for (var i = 0; i < group.eventList.length; i += 1) {
          __fetch( group.eventList[i] );
        }

      };

      $scope.getRatings = function getRatings(event) {

        $http
          .get('http://api.meetup.com/2/event_ratings', {
            "event_id" : event.id,
            "key" : MEETUP_API_KEY
          })
          .success(function(data) {

            //console.log('RATINGS LIST: ', data);

          })
          .error(function(err) {
            //console.log('getRatings ERROR: ', err);
          })

      };

      $scope.getEvents = function getEvents(status) {

        $http
          .get('/api/events', {
            params : {
              "group_urlname" : "cubantech",
              "status" : status,
              "key" : MEETUP_API_KEY
            }
          })
          .success(function(data) {

            //console.log('EVENTS LIST: ', data);

            $scope.eventGroups = $scope.eventGroups || [];

            //console.log(status.toUpperCase() + ' EVENTS');

            for (var i = 0; i < data.results.length; i += 1) {

              var time = data.results[i].time + data.results[i].utc_offset;
              var offset = data.results[i].utc_offset;
              var realTime = time + offset;

              data.results[i].realTime = realTime;

              data.results[i].descriptors = [
                {
                  "type" : "calendar",
                  "content" : moment(realTime).format('DD/MM/YYYY')
                },
                {
                  "type" : "clock-o",
                  "content" : moment(offset).format('hh:mm a')
                }
              ];
            }

            var eventGroup = {
              groupName : status.toUpperCase() + ' EVENTS',
              eventList : data.results
            };

            $scope.eventGroups.push(eventGroup);

            //$scope.$apply(function() {

            var obj = getQueryParameters();

            //console.log(obj);

            obj.group = ~~obj.group;
            obj.model = ~~obj.model;

            //console.log(obj, $scope.eventGroups);

            $scope.detailEvent = {};

            for ( var i = 0; i < $scope.eventGroups.length; i += 1 ) {
              for ( var j = 0; j < $scope.eventGroups[i].eventList.length; j += 1 ) {
                if ( $scope.eventGroups[i].eventList[j].id == obj.id ) {
                  $scope.detailEvent = $scope.eventGroups[i].eventList[j];
                }
              }
            }

            /*if ( obj.group < $scope.eventGroups.length ) {
              if ( obj.model < $scope.eventGroups[ obj.group ].eventList.length ) {
                $scope.detailEvent = $scope.eventGroups[ obj.group ].eventList[ obj.model ];
                //console.log('detailEvent: ', $scope.detailEvent);
              }
            }*/

            $scope.getComments(eventGroup);
            $scope.getEventAgenda(eventGroup);
            $scope.getEventPhotos(eventGroup);
            $scope.getEventAttachments(eventGroup);
              /// $scope.getRatings(data.results[0]);

            //});

          })
          .error(function(err) {
            //console.log('getEvents ERROR', err);
          });

      };

      $scope.getEvents('past');

      $scope.getMembers = function getMembers() {

        $http
          .get('/api/members')
          .success(function(data) {

            //console.log('MEMBERS LIST:', data);

            var len = data.results.length;

            for (var i = 0; i < len; i += 1) {

              if ( !!data.results[i].photo ) {
                data.results[i].img = '/api/photos?photo_id=' + data.results[i].photo.photo_id;
              } else {
                data.results[i].img = $scope.DEFAULT_AVATAR;
              }

              if ( !data.results[i].description ) {

                data.results[i].description = 'I love CubanTech';

              }

            }

            $scope.team = data.results;

          })
          .error(function(err) {
            //console.log('getMembers ERROR: ', err);
          });

      };

      $scope.getMembers();

      /// WATCHERS

      $scope.$watch('lang', function() {

        //console.log($scope.lang);

        if ( $scope.loadedLanguages.hasOwnProperty($scope.lang) === true ) {

          $scope.updateLanguage($scope.lang);

        } else {

          if ( $scope.langList.indexOf($scope.lang) > -1 ) {
            $http
              .get(ROUTE + $scope.lang + '.json')
              .success(function(data) {

                //console.log(data);

                $scope.loadedLanguages[ $scope.lang ] = data;

                $scope.updateLanguage($scope.lang);

              })
              .error(function() {
                $scope.lang = $scope.preferedLanguage;
              });
          } else {
            $scope.lang = $scope.preferedLanguage;
            $scope.updateLanguage($scope.lang);
          }

        }

      });//*/

      $scope.$watch('eventGroups', function() {

        if ( $scope.eventGroups.length > 0 ) {
          $scope.selectedGroup = $scope.eventGroups[0];
          $scope.selectedEvent = 0;
        }

      });

      $scope.useLanguage = function useLanguage(lng) {

        $scope.lang = lng;

      };

      $scope.updateLanguage = function updateLanguage(lng) {

        var dict = $scope.loadedLanguages[lng];

        for (var i in dict) {

          $scope[ i.toString() ] = dict[i];

        }

      };

      $scope.createDataset = function createDataset(event) {

        var data1 = event.data;
        var data2 = data1.data;
        var datasets = data2.datasets;

        var maxCant = 0;

        for (var i = 0; i < datasets.length; i += 1) {

          maxCant = Math.max(maxCant, datasets[i].data.length);

          if ( ['pie'].indexOf(data1.type) > -1 ) {
            datasets[i].backgroundColor = $scope.COLORS;
          } else {
            datasets[i].borderColor = $scope.COLORS[0];
            datasets[i].backgroundColor = $scope.COLORS[0] + '33';
          }

        }

        if ( data2.hasOwnProperty('labels') === false ) {
          data2.labels = ' '.repeat(maxCant - 1).split(' ');
        }

        var cnv = $window.document.querySelectorAll('canvas');

        if ( cnv != null ) {
          for (var i = 0; i < cnv.length; i += 1) {

            //console.log(cnv[i].id, event.title);

            if ( cnv[i].id === event.title ) {
              event.chart = new Chart(cnv[i].getContext('2d'), event.data);
              break;
            }

          }

        }

      };

      $scope.getLevel = function getLevel(val, ini, fin, divs) {

        return ~~( ((val - ini) * divs / (fin - ini) ) );

      };

      $scope.processEvent = function processEvent(event) {

        event.detailBtn = event.detailBtn || "See Program";

        if ( event.status === 'past' && !!event.rating === true ) {

          var part = Number(event.rating.average);
          var total = Number(event.total || 5);
          var divs = 5;
          var factor = total / divs;

          var len = $scope.STARS_DESCRIPTORS.length;

          var lv = $scope.getLevel(part, 0, total, divs);

          event.stars = ' '.repeat(divs).split(' ');

          for (var i = 0; i < lv; i += 1) {
            event.stars[i] = $scope.STARS_DESCRIPTORS[ len - 1 ];
          }

          //console.log(lv);

          var lv1 = $scope.getLevel(part, lv * factor, (lv + 1) * factor, len);

          //console.log(lv1);

          event.stars[ lv ] = $scope.STARS_DESCRIPTORS[ lv1 ];

          for (var i = lv + 1; i < divs; i += 1) {
            event.stars[i] = $scope.STARS_DESCRIPTORS[ 0 ];
          }

          event.stars = event.stars.slice(0, divs);

        }

        event.commentList = event.commentList || [];

        var cant = event.commentList.length;

        event.comments = cant;

        event.rated = [];

        for (var i = 0; i < divs; i += 1) {
          event.rated.push($scope.STARS_DESCRIPTORS[0]);
        }

        var len1 = event.commentList.length;

        event.counter = [
          len1,
          $scope.general[ len1 == 1 ? 'person' : 'people' ],
          $scope.general[ len1 == 1 ? 'hasS' : 'hasP' ],
          $scope.general.commentedThisMeetup
        ].join(' ');

        event.program = [];

      };

      $scope.rateEvent = function rateEvent(event, id) {

        var len = $scope.STARS_DESCRIPTORS.length;

        event.userRating = id;

        for (var i = 0; i < event.rated.length; i += 1) {
          if ( i < id ) {
            event.rated[i] = $scope.STARS_DESCRIPTORS[ len - 1 ];
          } else {
            event.rated[i] = $scope.STARS_DESCRIPTORS[ 0 ];
          }
        }

      };

      $scope.redirectTo = function redirectTo(dir, params) {

        //console.log('redirectTo: ', dir, params);

        var res = dir + '?';

        var first = true;

        for (var i in params) {

          if ( first === false ) {
            res = res + '&';
          } else {
            first = false;
          }

          res = res + i.toString() + '=' + params[i];

        }

        window.location.href = res;

      };

      $scope.processNavItem = function processNavItem(item) {

        if ( !( item.regexp instanceof RegExp) ) {
          item.regexp = new RegExp('^/' + item.regexp + '(\\.(htm|html|asp|php|jsp))?(#)?$', 'i');
        }

      };

    }
  ]);//*/

myApp.directive('carousel', function() {

  return {

    template : [
      '<div id="{{model.id}}" class="carousel-mini">',
        '<div class="carousel-image-container">',
          '<img class="carousel-image">',
        '</div>',
        '<a class="left carousel-control" data-slide="prev">',
          '<span class="icon-prev icon-chevron-left" aria-hidden="true"></span>',
          '<span class="sr-only">Previous</span>',
        '</a>',
        '<a class="right carousel-control" data-slide="next">',
          '<span class="icon-next icon-chevron-right" aria-hidden="true"></span>',
          '<span class="sr-only">Next</span>',
        '</a>',
      '</div>',
      '<div class="carousel-description">',
        'description goes here',
      '</div>'
    ].join(' '),
    replace : false,
    restrict : "E",
    scope : {
      model : "="
    },
    link : function(scope, element, attrs, ctrl, transcludeFn) {

      //console.log(arguments);

      var slides = scope.model.slides;

      var elem = element[0];
      var image = elem.querySelector('.carousel-image');
      var description = elem.querySelector('.carousel-description');
      var controls = elem.querySelectorAll('.carousel-control');

      if ( image === null || description === null) {
        return;
      }

      var len = slides.length;
      var id = 0;

      var itv;

      var INTERVAL = 6000, TIMEOUT = 500;

      image.src = slides[id].imageUrl;
      description.innerHTML = slides[id].content;

      var createInterval = function createInterval() {

        image.classList.add('not-visible');
        description.classList.add('not-visible');

        setTimeout(function() {
          image.src = slides[id].imageUrl;
          description.innerHTML = slides[id].content;
          image.classList.remove('not-visible');
          description.classList.remove('not-visible');
        }, TIMEOUT);

        clearInterval(itv);

        itv = setInterval(function() {

          image.classList.add('not-visible');
          description.classList.add('not-visible');

          setTimeout(function() {
            id = (id + 1) % len;
            image.src = slides[id].imageUrl;
            description.innerHTML = slides[id].content;
            image.classList.remove('not-visible');
            description.classList.remove('not-visible');
          }, TIMEOUT);

        }, INTERVAL);

      };

      createInterval();

      if ( controls != null ) {

        for (var i = 0; i < controls.length; i += 1) {

          controls[i].addEventListener('click', function(e) {

            var res = this.getAttribute('data-slide');

            if ( res === null ) {

              return;

            }

            clearInterval(itv);

            if ( res === 'prev' ) {
              id = ( id - 1 + len ) % len;
              createInterval();
            } else if ( res === 'next' ) {
              id = (id + 1) % len;
              createInterval();
            }

            //createInterval();

          }, false);

        }

      }

    }
  };

});

myApp.directive('gallery', function() {

  return {

    template : [
      '<div class="gallery">',
        '<div class="gallery-header" ng-transclude>',
        '</div>',
        '<hr class="hr-little black">',
        '<div class="row gallery-list">',
          '<div class="gallery-btn-container pull-left">',
            '<span class="icon-prev icon-chevron-left" aria-hidden="true"></span>',
          '</div>',
          '<div ng-repeat="sp in secondList" class="visible-sm visible-md visible-lg gallery-item">',
            '<img class="gallery-image" src="{{sp}}" alt="">',
          '</div>',
          '<div class="gallery-btn-container pull-right">',
            '<span class="icon-next icon-chevron-right" aria-hidden="true"></span>',
          '</div>',
        '</div>',
      '</div>'
    ].join(' '),
    replace : true,
    transclude : true,
    restrict : "E",
    scope : {
      list : "="
    },
    link : function(scope, element, attrs, ctrl, transcludeFn) {

      // console.log(element);

      var elem = element[0];
      var carets = elem.querySelectorAll('.gallery-btn-container');

      var listCopy = [];
      scope.secondList = [];

      var ini = 0, fin = 3, total;

      carets[0].addEventListener('click', function() {

        ini = (ini - 1 + total) % total;
        fin = (fin - 1 + total) % total;

        scope.$apply(function() {
          scope.secondList.pop();
          scope.secondList.unshift(listCopy[ini]);
        });

      }, false);

      carets[1].addEventListener('click', function() {

        ini = (ini + 1) % total;
        fin = (fin + 1) % total;

        scope.$apply(function() {
          scope.secondList.shift();
          scope.secondList.push(listCopy[fin]);
        });

      }, false);

      scope.$watch('list', function() {

        if ( Array.isArray(scope.list) === true) {

          listCopy = [].concat(scope.list);

          scope.secondList = listCopy.slice(0, 4);

          ini = 0;
          fin = 3;
          total = listCopy.length;

          if (listCopy.length <= 4) {
            for (var i = 0; i < carets.length; i += 1 ) {
              carets[i].style.opacity = 0;
            }
          }//*/

        }

      });

    }
  };

});

myApp.directive('comment', function() {

  return {

    templateUrl : '/templates/comment.htm',
    replace : false,
    restrict : "E",
    link : function(scope, element, attrs, ctrl, transcludeFn) {

      scope.$parent.$watch('eventGroups', function() {

        // console.log('EVENT_COMMENT: ', scope.event);

        if ( !!scope.event.commentList === true ) {

          scope.DEFAULT_AVATAR = scope.$parent.DEFAULT_AVATAR;

          var commentList = scope.event.commentList;
          var len = commentList.length;

          for (var i = 0; i < len; i += 1) {
            commentList[i].img = commentList[i].img || scope.DEFAULT_AVATAR;
          }

        }

      });

    }
  };

});

myApp.directive('event', function() {

  return {

    templateUrl : '/templates/event.htm',
    replace : true,
    restrict : "E",
    scope : {
      group : "@",
      model : "@",
      event : "="
    },
    link : function(scope, element, attrs, ctrl, transcludeFn) {

      if ( window.location.pathname !== '/events' ) {

        /*//scope.group = scope.group || 0;
        //scope.model = scope.model || 0;
        scope.event = scope.event || {};

        scope.$parent.$watch('eventGroups', function() {

          //console.log('EVENT_SCOPE: ', scope);

          if ( !!scope.event === true && Object.keys(scope.event).length > 0 ) {
            scope.$parent.processEvent(scope.event);
            return;
          }

          var obj = getQueryParameters();

          if ( scope.hasOwnProperty('group') === false || scope.hasOwnProperty('model') === false) {
            if ( ('group' in obj) && ('model' in obj) ) {
              scope.group = ~~obj.group;
              scope.model = ~~obj.model;
              //console.log('Group and Model added to scope', scope.group, scope.model);
            } else {
              //console.log('group or model not in project');
              //window.location.href = '/';
            }
          } else {
            if ( !scope.group || !scope.model ) {
              if ( ('group' in obj) && ('model' in obj) ) {
                scope.group = ~~obj.group;
                scope.model = ~~obj.model;
                //console.log('Group and Model added to scope1', scope.group, scope.model);
              } else {
                console.log('group or model not in project1');
                //window.location.href = '/';
              }
            } else {
              //console.log('Group and Model in scope');
              scope.group = ~~scope.group;
              scope.model = ~~scope.model;
            }
          }

          if ( Array.isArray(scope.$parent.eventGroups) ) {

            //console.log('eventGroups is an Array');

            //console.log('eventGroups', scope.$parent.eventGroups.length);

            if ( scope.group < scope.$parent.eventGroups.length ) {

              //console.log('eventList', scope.$parent.eventGroups[ scope.group ].eventList.length);

              if ( scope.model < scope.$parent.eventGroups[ scope.group ].eventList.length ) {

                scope.event = scope.$parent.eventGroups[ scope.group ].eventList[ scope.model ];

                scope.$parent.processEvent(scope.event);

              } else {
                //console.log('Length exceeded!!! 1');
                //window.location.href = '/';
              }
            } else {
              //console.log('Length exceeded!!! 2');
              //window.location.href = '/';
            }

          } else {

            //console.log('eventList is not an Array');

          }

        });//*/

      } else {

        scope.$parent.$watch('detailEvent', function() {

          //console.log(scope.$parent);

          scope.event = scope.$parent.detailEvent;

          //console.log('Changed event: ', scope.event);

          scope.$parent.processEvent(scope.event);

        });

      }

    }
  };

});

///                    *** NON-ANGULAR STUFF ***

function getQueryParameters() {

  var src = window.location.search;
  var obj = {};

  src = src.substr(1, src.length);

  src = src.split('&');

  src.forEach(function(e) {
    e = e.split('=');
    obj[ e[0] ] = e[1];
  });

  return obj;

}

(function() {
  Chart.defaults.global.legend.labels.boxWidth = 12;
})();