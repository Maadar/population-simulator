'use strict';

describe('main.ProductModel', function () {

  // load the controller's module
  beforeEach(module('population'));
  var _ProductModel;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (ProductModel) {
    _ProductModel = ProductModel;
  }));

  it('constructor: should assign default variables', function () {
    var sut = new _ProductModel();

    expect(sut.price).toBe(0);
    expect(sut.weight).toBe(0);
    expect(sut.name).toBe("");
  });

  //3xA : Arrange, Act, Assert
  it('setters', function () {
    //Arrange
    var sut = new _ProductModel();

    //Act
    sut.setName("cokolwiek");
    sut.setWeight(3);
    sut.setPrice(12);

    //Assert
    expect(sut.name).toBe("cokolwiek");
    expect(sut.weight).toBe(3);
    expect(sut.price).toBe(12);
  });

  it('getters', function () {
    //Arrange
    var sut = new _ProductModel();

    //Act
    sut.setName("wartosc");
    sut.setWeight(5);
    sut.setPrice(2);

    //Assert
    expect(sut.getName()).toBe("wartosc");
    expect(sut.getPrice()).toBe(2);
    expect(sut.getWeight()).toBe(5);
  });
});
