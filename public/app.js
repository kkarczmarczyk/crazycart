(function() {
    var app = angular.module('leaderboardScore', ["firebase", "datatables", "datatables.bootstrap"]);

    app.controller("LeaderboardController", function($scope, $firebaseObject, DTOptionsBuilder, DTColumnDefBuilder) {
        var ref = firebase.database().ref();
        $scope.live = $firebaseObject(ref.child("live"));
        $scope.players = $firebaseObject(ref.child("players"));
        $scope.races = $firebaseObject(ref.child("races"));
        $scope.leaderboard = $firebaseObject(ref.child("leaderboard"));

        // $scope.leaderboard.$watch(function() {
        //     Sortable.initTable(document.querySelector('#lead'));
        // });

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('paging', false)
            .withOption('searching', false)
            .withOption('info', false)
            .withOption('order', [2, "asc"])
            .withBootstrap();

        $scope.scoresLen = function(scores) {
            return _.keys(scores).length;
        };

        $scope.scoresBest = function(scores) {
            return _.min(_.values(scores));
        };

        $scope.scoresAvg = function(scores) {
            return _.round($scope.scoresTotal(scores) / $scope.scoresLen(scores));
        };

        $scope.scoresTotal = function(scores) {
            return _.sum(_.values(scores));
        };
    });

})();
