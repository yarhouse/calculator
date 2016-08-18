'use strict';

/**
 * @ngdoc service
 * @name calculatorApp.calculationFactory
 * @description
 * # calculationFactory
 * Factory in the calculatorApp.
 */
angular.module('calculatorApp')
  .factory('calculationFactory', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
