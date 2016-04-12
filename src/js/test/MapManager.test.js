let expect = require("chai").expect;
let jsdom = require('mocha-jsdom');

import MapManager from '../MapManager';

describe("Testea el modulo MapManager", () => {

  const mapManager = new MapManager();

  describe("Inicializacion", () => {
    it("Deberia iniciar descargado", () => {
      let loaded = mapManager.isLoaded();
      expect(loaded).to.equal(false);
    });

    it("No deberia tener mapas", () => {
      let mapsLength = mapManager.getMaps().length;
      expect(mapsLength).to.equal(0);
    });

    it("Deberia cargar la libreria al hacer el load", function(done) {
      mapManager.load().then(({manager, google, alreadyLoaded}) => {
        let loaded = mapManager.isLoaded();
        expect(loaded).to.equal(true);
        expect(alreadyLoaded).to.equal(false);
        done();
      });
    });

    it("Deberia devolverme la libreria aunque la cargue dos veces", (done) => {
      mapManager.load().then(({manager, google, alreadyLoaded}) => {
        let loaded = mapManager.isLoaded();
        expect(loaded).to.equal(true);
        expect(alreadyLoaded).to.equal(true);
        done();
      });
    });
  });

  describe('Creacion de mapa', () => {
    jsdom();

    it('Deberia crear un mapa en el elemento especificado', () => {
      let mapDiv = document.createElement('div');
      let map = mapManager.createMap({element: mapDiv, center: {lat: 0, lng: 0}, zoom: 8});
      expect(map.getDiv()).to.equal(mapDiv);
      expect(map.__gm).to.not.be.undefined;
    });

    it('Deberia crear mas de un mapa', () => {
      let mapDiv = document.createElement('div');
      let map = mapManager.createMap({element: mapDiv, center: {lat: 0, lng: 0}, zoom: 8});
      expect(map.getDiv()).to.equal(mapDiv);
      expect(map.__gm).to.not.be.undefined;
    });

    it('Deberia devolver la cantidad de mapas creados', () => {
      let mapsLength = mapManager.getMaps().length;
      expect(mapsLength).to.equal(2);
    });
  });
});

/*jsdom();

let mapDiv = document.createElement('div');
let mapManager = new MapManager();

beforeEach(function(done){
  mapManager.load( manager => {
    done();
  });
});  */