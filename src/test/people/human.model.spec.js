'use strict';

describe('people.HumanModel', function () {

  // load the controller's module
  beforeEach(module('population'));
  var _HumanModel,
      sut;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (HumanModel) {
    _HumanModel = HumanModel;
    sut = new _HumanModel();
  }));

  it('should assign parents', function () {
    expect(sut.mother).toBe(undefined);
    expect(sut.father).toBe(undefined);
  });

  it('should set alive value', function() {
    expect(sut.alive).toBe(true);
  });

  it('should generate random gender', function() {
    expect(sut.name).toBe(null);
  });

  it('should generate random gender', function() {
    expect(["f", "m"].indexOf(sut.gender)).toBeGreaterThan(-1);
  });

  it('should generate features between values', function() {
    expect(sut.features.inteligence).toBeWithinRange(1, 10);
    expect(sut.features.appearance).toBeWithinRange(1, 10);
    expect(sut.features.health).toBeWithinRange(1, 10);
  });

  it('should generate luck between values', function() {
    expect(sut.luck).toBeWithinRange(-20, 20);
  });

  it("should assign properties to object", function() {
    sut._presetProperties({name: "john williams", gender: "f", age: 12, features: {inteligence: 1, appearance: 2, health: 3}});
    expect(sut.name).toBe("john williams");
    expect(sut.gender).toBe("f");
    expect(sut.age).toBe(12);
    expect(sut.features.inteligence).toBe(1);
  });

  describe('assignSingleFeature', function() {

    it('should generate features without parents set', function() {
      sut.assignSingleFeature("inteligence");
      expect(sut.features.inteligence).toBeWithinRange(1, 10);
    });

    it('should generate features based on parents', function() {
      var father = new _HumanModel();
      var mother = new _HumanModel();
      father._presetProperties({features: {inteligence: 1, appearance: 5, health: 3}});
      mother._presetProperties({features: {inteligence: 1, appearance: 5, health: 3}});
      var person = new _HumanModel(mother, father);

      person.assignSingleFeature("appearance");

      expect(person.features.appearance).toEqual(5);
    });
  });

  describe('assignFeatures', function() {

    it('should assign all features randomly', function() {
      sut.assignFeatures();
      expect(sut.features.inteligence).toBeWithinRange(1, 10);
      expect(sut.features.appearance).toBeWithinRange(1, 10);
      expect(sut.features.health).toBeWithinRange(1, 10);
    });

    it('should generate features based on parents', function() {
      var father = new _HumanModel();
      var mother = new _HumanModel();
      father._presetProperties({features: {inteligence: 1, appearance: 5, health: 3}});
      mother._presetProperties({features: {inteligence: 1, appearance: 5, health: 3}});
      var person = new _HumanModel(mother, father);

      person.assignFeatures();

      expect(person.features.inteligence).toEqual(1);
      expect(person.features.appearance).toEqual(5);
      expect(person.features.health).toEqual(3);
    });
  });

  describe('determineMaxAge', function() {

    it('should calculate max age based on luck and health', function() {
      sut._presetProperties({features: {inteligence: 1, appearance: 5, health: 3}, luck: 5});
      expect(sut.determineMaxAge()).toEqual(35);
    });

    it('should calculate max age that should be 0 for low luck and health', function() {
      sut._presetProperties({features: {inteligence: 1, appearance: 5, health: 1}, luck: -20});
      expect(sut.determineMaxAge()).toEqual(0);
    });

  });


  describe('canCross', function() {

    it('can cross two specimen of different genders', function() {
      sut.setGender("f");
      var specimenB = new _HumanModel();
      specimenB.setGender("m");

      expect(sut.canCross(sut, specimenB)).toEqual(true);
    });

    it('cannot cross two specimen of same genders', function() {
      sut.setGender("m");

      var specimenB = new _HumanModel();
      specimenB.setGender("m");

      expect(sut.canCross(sut, specimenB)).toEqual(false);
    });

    it('cannot cross two specimen of same genders 2', function() {
      sut.setGender("f");
      var specimenB = new _HumanModel();
      specimenB.setGender("f");

      expect(sut.canCross(sut, specimenB)).toEqual(false);
    });

  });

  describe('cross', function() {

    it('should not return any children when genders of mates are equal', function() {
      sut.setGender("f");
      var specimenB = new _HumanModel();
      specimenB.setGender("f");

      expect(sut.cross(specimenB)).toEqual(null);
    });

    describe("should create children", function() {

      var specimenB;
      var children;
      var firstBorn;

      beforeEach(inject(function (HumanModel) {
        sut._presetProperties({features: {inteligence: 1, appearance: 5, health: 3}, luck: 5, gender: "f", name: "Jessie Johnson"});
        specimenB = new _HumanModel();
        specimenB._presetProperties({features: {inteligence: 1, appearance: 5, health: 3}, luck: 5, gender: "m", name: "John Stefanson"})

        children = sut.cross(specimenB);
        firstBorn = children[0];
      }));

      it('array of children should not be empty', function() {
        expect(children).toBeNonEmptyArray();
      });

      it('child should have fathers lastname', function() {
        var lastname = firstBorn.getLastName();
        expect(lastname).toEqual("Stefanson");
      });

      it('should assign parents correctly', function() {
        expect(firstBorn.mother).toEqual(sut);
        expect(firstBorn.father).toEqual(specimenB);
      });
    });
  });
});
