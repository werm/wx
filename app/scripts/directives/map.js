'use strict';

/**
 * @ngdoc directive
 * @name wxApp.directive:map
 * @description
 * # map
 */
angular.module('wxApp')
  .directive('map', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function(scope, element, attrs) {

            if(navigator.geolocation){
              navigator.geolocation.getCurrentPosition(success, error);
            }
            else {
              $scope.error = "Geolocation is not supported by this browser.";
            }

          function success(position){
            var popup = L.popup();

            var map = L.map('map', {
                center: new L.LatLng(position.coords.latitude,position.coords.longitude),
                zoom: 6,
                maxZoom: 18,
                minZoom: 2
            });

            // create the tile layer with correct attribution
            var tilesUrl = 'http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png';
            var tilesAttrib='Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
            var wxTiles = 'http://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png';
            var wxAttrib = 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>';
            var mapTiles = new L.tileLayer(tilesUrl, {
              attribution: tilesAttrib,
              opacity: 0.7,
              detectRetina: true,
              unloadInvisibleTiles: true,
              updateWhenIdle: true,
              reuseTiles: true
            });
            var wxMap = new L.tileLayer(wxTiles, {
              attribution: wxAttrib,
              opacity: 0.4,
              detectRetina: true,
              unloadInvisibleTiles: true,
              updateWhenIdle: true,
              reuseTiles: true
            });

            var marker = L.marker([position.coords.latitude,position.coords.longitude]).addTo(map);

            mapTiles.addTo(map);
            wxMap.addTo(map);
          }
          function error(){
            console.log("Couldn't find your location!");
          }
        }
    };
  });
