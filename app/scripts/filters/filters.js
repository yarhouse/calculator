'use strict';

/**
 * @ngdoc filter
 * @name calculatorApp.filter:filters
 * @function
 * @description
 * # filters
 * Filter in the calculatorApp.
 */
angular.module('calculatorApp')
  .filter('filters', function () {
    return function (input) {
      return 'filters filter: ' + input;
    };
  })
  .filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
