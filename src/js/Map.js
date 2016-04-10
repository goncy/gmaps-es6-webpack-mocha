import GoogleMapsLoader from 'google-maps';

let _mapLoaded = false;
let _map;

export default class Mapa {
  constructor() {

    if (_mapLoaded) {
      this._promise = new Promise((resolve, reject) => {
        if (_map) {
          resolve(_map);
        } else {
          reject(new Error("Map is loaded but no map is assigned"));
        }
      });
    } else {
      GoogleMapsLoader.load();

      this._promise = new Promise((resolve, reject) => {
        GoogleMapsLoader.onLoad(createMap);

        function createMap() {
          _mapLoaded = true;
          let _map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 110.644},
            zoom: 8
          })

          if (typeof _map === "object") {
            resolve(_map);
          } else {
            reject("Error al crear el mapa");
          }

        }
      });
    }

    return this._promise;
  }
}

// Pasar todo a sus funciones y crear los test