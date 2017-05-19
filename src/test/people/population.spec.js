'use strict';

describe('population', function() {

  beforeEach(module('population'));

  var _Population;
  var _HumanModel;
  var sut;
  var sut2;

  beforeEach(inject(function (Population, HumanModel) {
    _Population = Population;
    _HumanModel = HumanModel;
    sut = new _HumanModel();
    sut2 = new _HumanModel();
  }));

  it('should add value to array', function() {
    _Population.addHuman(10);
    expect(_Population.getPeople()).toContain(10);
  });

  it('should display array of elements', function() {
    var obj2 =  { name: "Adam", surname: "Jakistam", age: 6 };
    _Population.addPeople([obj2]);
    expect(_Population.getPeople()).toContain(obj2);
    expect(_Population.getPeople()).toBeArray();
  });

  it("should return not empty array", function() {
    sut._presetProperties({features: {inteligence: 1, appearance: 5, health: 1}, luck: -20, name: "Ma dsadsa", age:20, gender: "m"});
    sut2._presetProperties({features: {inteligence: 1, appearance: 5, health: 1}, luck: -20, name: "Madsa dsadsa", age: 20, gender: "f"});
    _Population.addHuman(sut);
    _Population.addHuman(sut2);
    expect(_Population.crossRandomly()).toBeNonEmptyArray();
  });
});
