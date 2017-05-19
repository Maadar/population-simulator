(function() {
  'use strict';

  angular
    .module('population')
    .service('Timeline', TimelineService);

    /* @ngInject */
    function TimelineService($interval, EventEmitter, Population) {
      var intervalHandle = null;
      var INTERVAL_TIME = 500;

      var _onTimeChange = function() {
        EventEmitter.trigger("newYear");
        Population.crossRandomly();
      }

      return {
        start: function() {
          intervalHandle = $interval(_onTimeChange, INTERVAL_TIME);
        },
        stop: function() {
          $interval.cancel(intervalHandle);
          intervalHandle = null;
        },
        isRunning: function() {
          return intervalHandle !== null;
        }
      }
    }
})();
