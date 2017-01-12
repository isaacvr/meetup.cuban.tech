
var meetupApp = angular.module('MeetupApp', []);

meetupApp.controller('MeetupCtl', 
    function($scope) {
      $scope.events = meetup_data.events;
      $scope.future = [];
      $scope.past = [];
      $scope.today = [];

      var events = meetup_data.events,
          timeline = meetup_data.timeline,
          now = new Date(),
          today_am = new Date(now.getYear() + 1900, now.getMonth(), now.getDate(), 0, 0, 0),
          today_pm = new Date(now.getYear() + 1900, now.getMonth(), now.getDate(), 23, 59, 59);
      for (var i = 0; i < timeline.length; ++i) {
        var meetup = events['ev_' + timeline[i]];
        var queue;
        if (meetup.date < today_am) {
          queue = $scope.past;
        }
        else if (meetup.date > today_pm) {
          queue = $scope.future;
        }
        else {
          queue = $scope.today;
        }
        queue.push(meetup)
      }

      $scope.timeline = meetup_data.timeline;
      $scope.sources = meetup_data.sources;
    }
);


