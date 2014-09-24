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
    $scope.cam;
    $scope.lat;
    $scope.lng;

    // KEYS
    var forecastKey = 'cea2fb224c29df11b868065c2330c61c';

    $scope.wxLoading = true;

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error);
    }
    else {
      $scope.error = "Geolocation is not supported by this browser.";
    }

    function success(pos){
      $scope.lat = pos.coords.latitude;
      $scope.lng = pos.coords.longitude;

      var forecastResource = $resource('https://api.forecast.io/forecast/' + forecastKey + '/' + $scope.lat + ','+ $scope.lng, {
          callback: 'JSON_CALLBACK'
        },
        {
          getWeather: {
            method: 'JSONP'
          }
        });

      function loadRemoteData(){     
        $scope.isLoading = true;
        forecastResource.getWeather()
          .$promise.then(function(weather){
            $scope.wxLoading = false;
            $scope.weather = {
              current: {
                icon: weather.currently.icon,
                iconSize: 64,
                storm: weather.current.nearestStormDistance,
                summary: weather.currently.summary,
                temperature: weather.currently.temperature
              }
            }
          },
            function(error){
              $scope.error = error;
            });
        };

      loadRemoteData();

    };

    function error(){
      console.log("Couldn't find your location.")
    }

});
