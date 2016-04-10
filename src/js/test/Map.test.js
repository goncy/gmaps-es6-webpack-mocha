var expect = require("chai").expect;
var jsdom = require('mocha-jsdom')

import Mapa from '../Map';

describe("Testea el modulo Map", function() {
  describe("Inicializacion del mapa", function() {
    jsdom();
    let mapDiv = document.createElement('div').setAttribute("id", "map");
    let map = new Mapa('map');

    it("Deberia devolver un mapa cuando se crea un new Mapa()", function() {
      map.then( mapa => {
        expect(mapa).to.not.be.undefined;
      });
    });
    it("Deberia devolver una instancia del mapa anterior en caso de que ya se hubiese creado un mapa", function() {
      map.then( mapa => {
        expect(mapa).to.equal(map.then( mapa => mapa));
      });
    });
  });
});