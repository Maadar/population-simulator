(function() {
  'use strict';

  angular
    .module('population')
    .service('Population', PopulationService);

    function PopulationService() {

      var perfectSpecimen = function(person, gender) {
        return (person.gender === gender) && person.alive && person.age > 15 && person.age < 25;
      };

      var pickPersonByGender = function(gender) {
        var oneGender = _people.filter(function(person) {
          return perfectSpecimen(person, gender);
        });
        return oneGender[Math.round(Math.random()*(oneGender.length-1))];
      }

      //ten array jest prywatny, za pomoca getPeople() możemy uzyskac dostęp do niej
      var _people = [];

      return {
        addHuman: function(human) {
          _people.push(human);
        },
        getPeople: function() {
          return _people;
        },
        //przyjmuje obiekt i iteruje po wszystkich, dodając nowo powstale osoby
        addPeople: function(childrenArr) {
          childrenArr.forEach(function(newChild) {
            _people.push(newChild);
          });
        },

        crossRandomly: function() {
          var female = pickPersonByGender("f");
          var male = pickPersonByGender("m");
          var children = [];
          if (female !== undefined && male !== undefined) {
            // w tym miejscu buduje sie nowy obiekt
            var children = female.cross(male);
            console.log("Crossing: " + female.name + " + "+male.name + "["+children.length+"]");
            //console.log(female);
            var femaleHomeName = female.name;
            var femaleFirstName = female.getFirstName(female.name);
            var maleLastName = male.getLastName(male.name);
            female.name = femaleFirstName + " "+ maleLastName;
            //przyjmuje obiekt
            this.addPeople(children);
          }
          /* jezeli warunek nie przejdzie, zwraca pusty array, jesli tak, doda
          children do _people */
          return children;
        }
      }
    }
})();
