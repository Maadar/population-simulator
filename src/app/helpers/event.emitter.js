(function() {
  'use strict';

  angular
    .module('population')
    .service('EventEmitter', EventEmitterService);

    function EventEmitterService() {

      var eventsRegistry = {};

      return {
        trigger: function(eventName, properties) {
            if (angular.isDefined(eventsRegistry[eventName])) {
              eventsRegistry[eventName].forEach(function(listener) {
                listener.call(listener, properties);
              });
            }
         },
         on: function(eventName, listener) {
           if (!angular.isDefined(eventsRegistry[eventName])) {
             eventsRegistry[eventName] = [];
           }
           eventsRegistry[eventName].push(listener);
         },
         off: function(eventName, listener) {
           eventsRegistry[eventName].forEach(function(listnr, index, object){
             if (listnr === listener) {
               object.splice(index, 1);
             }
           });
         }
      }
    }
})();


/* w modelu carsModel definiuję sobie weight, ktora przechowuje weight i przekazuje jako parametr
weight, ktory zostaje przekazany do nowo utworzonego obiektu, wtedy w ng-model to co wpisze,
automatycznie trafia do modelu, skąd za pomocą getWeight może odwolywac sie do metod w cart.model
*/
