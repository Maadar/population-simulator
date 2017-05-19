(function() {
  'use strict';

  angular
    .module('population')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, HumanModel, NamesProvider, Timeline, EventEmitter, Population) {

    var Eve = {
      features: {
        inteligence: 1,
        appearance: 1,
        health: 6
      }
    };
    var Adam = {
        features: {
          inteligence: 10,
          appearance: 10,
          health: 10
        }
    };

    Population.addHuman(new HumanModel(Eve, Adam, {gender: "f", name: "Aneta Snow", lastName: "Snow", age: 20}));
    Population.addHuman(new HumanModel(Eve, Adam, {gender: "f", name: "Aneta Snow", lastName: "Snow", age: 20}));
    Population.addHuman(new HumanModel(Eve, Adam, {gender: "f", name: "Aneta Snow", lastName: "Snow", age: 20}));
    Population.addHuman(new HumanModel(Eve, Adam, {gender: "f", name: "Aneta Snow", lastName: "Snow", age: 20}));
    Population.addHuman(new HumanModel(Eve, Adam, {gender: "f", name: "Aneta Snow", lastName: "Snow", age: 20}));
    Population.addHuman(new HumanModel(Eve, Adam, {gender: "m", name: "Bartosz Kowalski", lastName: "Kowalski", age: 20}));
    Population.addHuman(new HumanModel(Eve, Adam, {gender: "m", name: "Bartosz Kowalski", lastName: "Kowalski", age: 20}));
    Population.addHuman(new HumanModel(Eve, Adam, {gender: "m", name: "Bartosz Kowalski", lastName: "Kowalski", age: 20}));
    Population.addHuman(new HumanModel(Eve, Adam, {gender: "m", name: "Bartosz Kowalski", lastName: "Kowalski", age: 20}));
    Population.addHuman(new HumanModel(Eve, Adam, {gender: "m", name: "Bartosz Kowalski", lastName: "Kowalski", age: 20}));

    EventEmitter.on("birth", function(data) {
      console.log("born:", data.name);
    });

    EventEmitter.on("death", function(data) {
      console.log("died:", data.name);
    });

    $scope.toggleTimeline = function() {
      if (Timeline.isRunning()) {
        Timeline.stop();
      } else {
        Timeline.start();
      }
    };

    var fathersArray = [];
    var mothersArray = [];

    var checkFathers = function(person) {
      if (person.father !== undefined && person.father.name) {
        fathersArray.push(person.father.name);
        checkFathers(person.father);
      }
    };

    var checkMothers = function(person) {
      if (person.mother !== undefined && person.mother.name) {
        mothersArray.push(person.mother.name);
        checkMothers(person.mother);
      }
    };

    $scope.showAncestors = function(person) {
      fathersArray = [];
      mothersArray = [];
      checkFathers(person);
      checkMothers(person);

      console.log(JSON.stringify(fathersArray, null, 2));
      console.log(JSON.stringify(mothersArray, null, 2));
    };

    $scope.isTimelineRunning = function() {
      return Timeline.isRunning();
    };

    $scope.people = Population.getPeople();
    console.log($scope.people);

    $scope.checkAncestors = function() {
      var thisPerson = this.person.lastName;
      $scope.people.forEach(function(a) {
        if (thisPerson === a.father.lastName || thisPerson === a.mother.lastName) {
          console.log("Czlonkowie rodziny: ", a.name);
        }
      });
      if (this.person.father.name === undefined) {
        console.log("Brak");
      } else {
        console.log("Ojciec", this.person.father.name);
        console.log("Matka", this.person.mother.name);
      }
    }
  }

})();
