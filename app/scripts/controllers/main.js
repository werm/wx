'use strict';

/**
 * @ngdoc function
 * @name wxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wxApp
 */
angular.module('wxApp')
  .controller('MainCtrl', function ($scope, $http, $resource) {
    $scope.weather = [];
    var latlng = '40.1295004,-82.9780043';

    var resource = $resource('https://api.forecast.io/forecast/cea2fb224c29df11b868065c2330c61c/' + latlng, {
        callback: 'JSON_CALLBACK'
      },
      {
        getWeather: {
          method: 'JSONP'
        }
      });

    loadRemoteData();

    function loadRemoteData(){     
      $scope.isLoading = true;
      resource.getWeather().$promise.then(
        function(weather) {
          $scope.isLoading = false;
          $scope.weather = weather;
        },
        function(error){
          $scope.error = error;
        });
    }

});
  //   $http.jsonp('' + latlng + '&callback=')
  //   .success(function(weather){
  //     $scope.weather = weather;
  //   })
  //   .then(function(){
  //     console.log($scope.weather)
  //   })
  // });
