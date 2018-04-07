/**
 *  @author: Isaac Vega Rodriguez          <isaacvega1996@gmail.com>
 */
'use strict';

///                               *** ANGULAR STUFF ***

var myApp = angular.module('cubantech', []);

myApp
  .controller('cubantechController', [
    '$scope',
    '$http',
    '$window',
    function($scope, $http, $window) {

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

      /// Lista de lenguajes disponibles
      $scope.langList = [ "en", "es" ];

      $scope.visual =  {
        marketing : {
          height : "350px",
          display : "grid"
        }
      };

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

      $scope.useLanguage = function useLanguage(lng) {

        $scope.lang = lng;

      };

      $scope.nodeTemplate = function nodeTemplate(data) {

        /**

          @params: data

          data:
            - name          -->      Nombre de la persona
            - title         -->      Cargo
            - avatar        -->      Avatar
            - email         -->      Correo electronico
            - twitter       -->      Cuenta de twitter
            - linkedin      -->      Cuenta de linkedin

        //*/

        data.avatar = data.avatar || "img/anonimUser.png";
        data.email = data.email || '';
        data.twitter = data.twitter || '';
        data.linkedin = data.linkedin || '';
        data.description = data.description || 'no description available';

        return `
          <div class="orgComponent col-xs-1">
            <div class="row">
              <div class="col-xs-12 featurette-container">
                <img src="${data.avatar}" value="${data.avatar}" class="orgAvatar" data-toggle="modal" data-target="#myModal">
              </div>
              <div class="col-xs-12 orgName" value="${data.name}">
                <span>${data.name}</span>
              </div>
              <div class="col-xs-12 orgCharge" value="${data.title}">
                <span>${data.title}</span>
              </div>
              <div class="col-xs-12 orgContacts">
                <ul class="col-xs-12">
                  <li class="orgIcon fa fa-envelope col-xs-4">
                    <span class="orgIconDescriptor" value="${data.email}"></span>
                  </li>
                  <li class="orgIcon fa fa-twitter col-xs-4">
                    <span class="orgIconDescriptor" value="${data.twitter}"></span>
                  </li>
                  <li class="orgIcon fa fa-linkedin col-xs-4">
                    <span class="orgIconDescriptor" value="${data.linkedin}"></span>
                  </li>
                </ul>
              </div>
              <div class="hidden orgDescription">
                ${data.description}
              </div>
            </div>
          </div>`;
      };

      $scope.contactTemplate = function contactTemplate(data) {

        return `
          <li class="orgIcon fa fa-${data.type}">
            <span class="modal-usercontact">${data.value}</span>
          </li>
        `;

      };

      $scope.updateLanguage = function updateLanguage(lng) {

        var dict = $scope.loadedLanguages[lng];

        for (var i in dict) {

          $scope[ i.toString() ] = dict[i];

        }

        var org = $('#organigram');

        if (org.length > 0) {

          org.html('');

          var xxx = org.orgchart({
            data         : $scope.organigram,
            nodeTemplate : $scope.nodeTemplate
          });

          $('.orgAvatar').click(function(e) {

            var __root = e.target.parentElement.parentElement;

            var avatar   = $(__root).find('.orgAvatar').attr('value');
            var name     = $(__root).find('.orgName').attr('value');
            var charge   = $(__root).find('.orgCharge').attr('value');
            var desc     = $(__root).find('.orgDescription').html().trim();
            var email    = $(__root)
                              .find('.orgIcon.fa-envelope')
                              .find('.orgIconDescriptor')
                              .attr('value');

            var twitter  = $(__root)
                              .find('.orgIcon.fa-twitter')
                              .find('.orgIconDescriptor')
                              .attr('value');

            var linkedin = $(__root)
                              .find('.orgIcon.fa-linkedin')
                              .find('.orgIconDescriptor')
                              .attr('value');

            $scope.$apply(function() {

              $scope.userSelected = {
                name        : name,
                charge      : charge,
                avatar      : avatar,
                description : desc,
                contacts    : {
                  envelope : email,
                  twitter  : twitter || "",
                  linkedin : linkedin || ""
                }
              };

            });

          });

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

        //console.log(event);

        var DESCRIPTORS = [
          'fa fa-star-o',
          'fa fa-star-half-o',
          'fa fa-star',
        ]

        var part = Number(event.mean);
        var total = Number(event.total);
        var divs = 5;
        var factor = total / divs;

        var lv = $scope.getLevel(part, 0, total, divs);

        event.rating = [ '', '', '', '', '' ];

        for (var i = 0; i < lv; i += 1) {
          event.rating[i] = DESCRIPTORS[ DESCRIPTORS.length - 1 ];
        }

        //console.log(lv);

        var lv1 = $scope.getLevel(part, lv * factor, (lv + 1) * factor, DESCRIPTORS.length);

        //console.log(lv1);

        event.rating[ lv ] = DESCRIPTORS[ lv1 ];

        for (var i = lv + 1; i < divs; i += 1) {
          event.rating[i] = DESCRIPTORS[ 0 ];
        }

        var cant = ~~Number.parseInt(event.comments);

        event.comments = cant + ' ' + $scope.general[( cant != 1 ) ? 'comments' : 'comment' ] + ' ';

      };

    }
  ]);//*/

///                    *** NON-ANGULAR STUFF ***

(function() {
  Chart.defaults.global.legend.labels.boxWidth = 12;
})();