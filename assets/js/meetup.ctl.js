
var meetupApp = angular.module('MeetupApp', []);

meetupApp.controller('MeetupCtl', 
    function($scope) {
      $scope.events = meetup_data.events;
      $scope.timeline = meetup_data.timeline;
      $scope.sources = meetup_data.sources;
    }
);


