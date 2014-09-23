'use strict';

/**
 * @ngdoc function
 * @name wxApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wxApp
 */
angular.module('wxApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
