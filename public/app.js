(function() {
    var app = angular.module('leaderboardScore', ["firebase"]);

    app.controller("LeaderboardController", function($scope, $firebaseObject) {
        var ref = firebase.database().ref();
        var syncLive = $firebaseObject(ref.child("live"));
        syncLive.$bindTo($scope, "live");
    });
})();
