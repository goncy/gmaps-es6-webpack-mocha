import MapManager from '../MapManager';
let expect = require("chai").expect;

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
      mapManager.load().then(({ google, alreadyLoaded}) => {
        let loaded = mapManager.isLoaded();
        expect(loaded).to.equal(true);
        expect(alreadyLoaded).to.equal(true);
        done();
      });
    });
  });

  describe('Creacion de mapa', () => {
    it('Deberia crear un mapa en el elemento especificado', (done) => {
      let mapDiv = document.createElement('div');
      mapManager.createMap(mapDiv, {center: {lat: 0, lng: 0}, zoom: 8}).then( map => {
        expect(map.getDiv()).to.equal(mapDiv);
        done();
      });
    });

    it('Deberia crear mas de un mapa', (done) => {
      let mapDiv = document.createElement('div');
      mapManager.createMap(mapDiv, {center: {lat: 0, lng: 0}, zoom: 8}).then( map => {
        expect(map.getDiv()).to.equal(mapDiv);
        expect(mapManager.getMaps().length).to.equal(2);
        done();
      });
    });
  });

  describe('Creacion de markers', () => {
    it('Deberia crear un marker y agregarlo al mapa', function(done) {
      let mapDiv = document.createElement('div');
      mapManager.createMap(mapDiv, {center: {lat: 0, lng: 0}, zoom: 8}).then( map => {
        let marker = mapManager.addMarker(map, {position: {lat: -34.7040225, lng: -58.308597}, draggable: true});
        expect(marker.visible).to.equal(true);
        done();
      });
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