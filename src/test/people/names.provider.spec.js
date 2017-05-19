'use strict';

describe('NamesProvider', function() {
    var femaleNames = ["Anna","Maria","Katarzyna","Małgorzata","Agnieszka","Barbara","Krystyna","Ewa","Elżbieta","Zofia","Teresa","Magdalena","Joanna","Janina","Monika","Danuta","Jadwiga","Aleksandra","Halina","Irena","Beata","Marta","Dorota","Helena","Karolina","Grażyna","Jolanta","Iwona","Marianna","Natalia","Patrycja","Izabela","Ewelina","Julia","Wanda","Marzena","Wiesława","Weronika","Wiktoria","Klaudia","Edyta","Emilia","Genowefa","Dominika","Kazimiera","Hanna","Kamila","Martyna","Kinga","Lucyna","Stefania","Józefa","Alina","Zuzanna","Gabriela","Władysława","Mariola","Lidia","Mirosława","Henryka","Wioletta","Czesława","Oliwia","Regina","Bogumiła","Angelika","Sabina","Daria","Aniela","Bogusława"];
    var maleNames = ["Piotr","Krzysztof","Andrzej","Jan","Stanisław","Tomasz","Paweł","Marcin","Michał","Marek","Grzegorz","Józef","Łukasz","Adam","Zbigniew","Jerzy","Tadeusz","Mateusz","Dariusz","Mariusz","Wojciech","Ryszard","Jakub","Henryk","Robert","Rafał","Kazimierz","Jacek","Maciej","Kamil","Przemysław","Sebastian","Daniel","Władysław","Zdzisław","Patryk","Bartosz","Edward","Mieczysław","Leszek","Karol","Arkadiusz","Czesław","Waldemar","Szymon","Adrian","Kacper","Bogdan","Eugeniusz","Bartłomiej","Antoni","Franciszek","Stefan","Radosław","Zygmunt","Dominik","Krystian","Konrad","Aleksander","Bogusław","Ireneusz","Włodzimierz","Zenon","Witold","Sylwester","Hubert","Mikołaj","Filip","Wiktor","Bronisław"];
    beforeEach(module('population'));
    var _NamesProvider;

  beforeEach(inject(function (NamesProvider) {
    _NamesProvider = NamesProvider;
  }));
  describe("should check generateName method", function() {
    it("should check femaleNames array when generateName contain 'f'", function() {
      var gender = _NamesProvider.generateName('f');
      expect(femaleNames).toContain(gender);
    });

    it("should check maleNames array when generateName contain 'm'", function() {
      var gender = _NamesProvider.generateName('m');
      expect(maleNames).toContain(gender);
    });
  });
});
