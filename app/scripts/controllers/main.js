'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the calculatorApp
 */
angular.module('calculatorApp')
.controller('MainCtrl', function ($scope, $timeout, $anchorScroll, $location) {
    this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];

    // running log of all equations
    $scope.calcLogs = [];

    // The current equation
    $scope.currentEqu = [];

    // $event.keyCodes for * , + , - , /
    var opKeyCodes = [42, 43, 45, 47];
    // Activates on ngKeypress
    $scope.nextEntry = function($event, data){

        // User hits neter for complete equation
        if ($event.keyCode === (13 || 61)) { // Enter :13 || '=' :61
            $event.preventDefault();
            _clearCalcField();
            $scope.currentEqu.push(data);
            _completedEquation();

        // User holds shift and hits - to toggle a negative number
        } else if ($event.keyCode === 45 && $event.shiftKey && angular.isNumber(data)) { // '-' :45 and shift to make a negative
            $event.preventDefault();
            $scope.negativeToggle();

        // User enters a number and an accepted operator
        } else if (_.contains(opKeyCodes, $event.keyCode) && angular.isNumber(data) ) {
            $event.preventDefault();
            _clearCalcField();
            _checkAndSetNext(String.fromCharCode($event.which), data);


        // User continues with from last equation with operator
        } else if (_.contains(opKeyCodes, $event.keyCode) && !angular.isNumber(data) && angular.isNumber(lastAnswer)) {
            $event.preventDefault();
            _clearCalcField();
            _checkAndSetNext(String.fromCharCode($event.which), lastAnswer);

        // if the event key is a not number or allowed keyCode
        } else if (!angular.isNumber(parseInt(String.fromCharCode($event.which)))) {
            $event.preventDefault();
        }

        // Buddy here needs an extra push to scroll all the way down. yOffset is not helping at all, apparently.
        $anchorScroll('anchor');
        $timeout(function(){
            $anchorScroll('anchor');
        }, 100);
    };

    $scope.negativeToggle = function(){
        $scope.calcField = $scope.calcField * -1;
    };

    function _checkAndSetNext(op, num){
        if (angular.isNumber(num)) {
            $scope.currentEqu.push(num);
            $scope.currentEqu.push(op);
        }
    }

    function _clearCalcField(){
        $scope.calcField = '';
    }
    $scope.clearEqu = function(){
        _clearCalcField();
        $scope.currentEqu = [];
    }
    $scope.clearAll = function(){
        $scope.calcLogs = [];
        $scope.clearEqu();
    }

    var lastAnswer = '';
    function _completedEquation(){
        // If the last value in the array is NaN...
        if (!angular.isNumber($scope.currentEqu[$scope.currentEqu.length-1])) {
            // ...push an extra 0 into the calculation to make the eval pass
            $scope.currentEqu.push(0);
        };

        // clone it so we don't join with the original
        var clone = angular.copy($scope.currentEqu);

        // eval the joined the clone array for an answer
        var ans = eval(clone.join(' '));

        // push and equals sign and the answer to the original equation
        $scope.currentEqu.push('=');
        $scope.currentEqu.push(ans);

        // save last answer for use in next equation
        lastAnswer = ans;

        // push a clone of the completed equation to the log
        $scope.calcLogs.push(angular.copy($scope.currentEqu));

        // clear the equation to reuse array
        $scope.currentEqu = [];
        console.log($scope.calcLogs);
    };
});
