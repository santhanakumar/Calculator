// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic-material'])

    .controller('AppController', ['$scope', '$timeout', 'ionicMaterialInk', function($scope, $timeout, ionicMaterialInk){
        $scope.numbers   = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', '00'];
        $scope.operators = ['/', '*', '-', '+', '='];
        $scope.formula   = ['0'];
        $scope.result    = 0;

        $scope.add = function (item) {
            if (item == 'CLEAR') {
                $scope.reset();
            } else if (item == 'DEL') {
                $scope.remove();
            } else {
                (!/[0-9]/.test(item) && !/[0-9]/.test($scope.formula.slice(-1)[0])) ? $scope.remove() : null;
                ($scope.formula == '0' && /[0-9]/.test(item)) ? $scope.formula = [item] : $scope.formula.push(item);
            }
            $scope.solve();
        };

        $scope.solve = function () {
            if (!/[0-9]/.test($scope.formula.slice(-1)[0]))
                $scope.result = eval($scope.formula.slice(0, $scope.formula.length - 1).join(''));
            else
                $scope.result = eval($scope.formula.join(''));
        };

        $scope.reset = function () {
            $scope.formula = ['0'];
            $scope.solve();
        };

        $scope.remove = function () {
            $scope.formula.pop();
            ($scope.formula.length == 0) ? $scope.reset() : null;
        };
        $timeout(function(){
            ionicMaterialInk.displayEffect();
        }, 1000);
    }])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
