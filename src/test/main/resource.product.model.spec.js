'use strict';

describe('main.ResourceMaterialModel', function() {

  beforeEach(module('population'));
  var _ResourceMaterialModel;

  beforeEach(inject(function(ResourceMaterialModel) {
    _ResourceMaterialModel = ResourceMaterialModel;
  }));

  it('constructor: should assign default variables', function() {
    var sut = new _ResourceMaterialModel();

    expect(sut.name).toBe("");
    expect(sut.price).toBe(0);
    expect(sut.weight).toBe(0);
    expect(sut.count).toBe(0);
  });

  it('setters', function() {
    //Arrange
    var sut = new _ResourceMaterialModel();

    //Act
    sut.setName("anything");
    sut.setPrice(31);
    sut.setWeight(2);

    //Assert
    expect(sut.name).toBe("anything");
    expect(sut.price).toBe(31);
    expect(sut.weight).toBe(2);
  });

  it('getters', function() {

    var sut = new _ResourceMaterialModel();

    sut.price = 2;
    sut.count = 2;
    sut.weight = 3;
    sut.setName("cos");

    expect(sut.getName()).toBe("cos");
    expect(sut.getPrice()).toEqual(4);
    expect(sut.getWeight()).toEqual(6);

  });
});
