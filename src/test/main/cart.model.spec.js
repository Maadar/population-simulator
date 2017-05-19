'use strict';

describe('main.CartModel', function () {

  // load the controller's module
  beforeEach(module('population'));
  var _CartModel,
      sut;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (CartModel) {
    //_ProductModel = ProductModel;
    _CartModel = CartModel;
    //Subject Under Test:
    sut = new _CartModel();
  }));

  it('constructor', function () {
    expect(sut.listOfProducts).toEqual(jasmine.any(Array));
    expect(sut.sumOfWeight).toBe(0);
  });

  it('addProduct: should add object to listOfProducts', function() {
    //stworzenie pustego obiektu do przekazania do listy produktow
    var mock = jasmine.createSpy();

    sut.addProduct(mock);

    expect(sut.listOfProducts[0]).toEqual(mock);
  });

  describe('overallPrice', function() {

    it('should return 0 for empty cart', function() {
      expect(sut.overAllPrice()).toEqual(0);
    });

    it('should call getPrice on a single product', function() {
      var mock = {
        getPrice: function() {
          return 5;
        }
      };
      //wczepienie sie w metode getPrice by, moc pozniej sprawdzic czy zostala wywolana
      //and.callThrough() powoduje ze metoda na ktorej ustawiony jest spy jest wywolywana
      spyOn(mock, 'getPrice').and.callThrough();
      sut.addProduct(mock);

      expect(sut.overAllPrice()).toEqual(5);
      expect(mock.getPrice).toHaveBeenCalled();
    });

    it('should calculate overall price and call getPrice on products', function() {
      var mock1 =  {
        getPrice: function() {}
      },
      mock2 = {
        getPrice: function() {}
      };
      //ustawienei na sztywno zwracanej wartosci przez funkcje getPrice
      spyOn(mock1, 'getPrice').and.returnValue(7);
      spyOn(mock2, 'getPrice').and.returnValue(3);
      sut.addProduct(mock1);
      sut.addProduct(mock2);

      expect(sut.overAllPrice()).toEqual(10);
      expect(mock1.getPrice).toHaveBeenCalled();
      expect(mock2.getPrice).toHaveBeenCalled();
    });
  });

});
