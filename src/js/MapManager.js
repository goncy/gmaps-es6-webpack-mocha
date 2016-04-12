import GoogleMapsLoader from 'google-maps';

let _libraryLoaded = false;
let _library = {};

export default class MapManager {
  constructor() {
    this._maps = [];
  }

  load() {
    return new Promise((resolve, reject) => {
      if (!_libraryLoaded) {
        GoogleMapsLoader.load();
        GoogleMapsLoader.onLoad( (google) => {
          _libraryLoaded = true;
          _library = google;
          resolve({manager: this, google: google, alreadyLoaded: false});
        });
      } else {
        resolve({manager: this, google: google, alreadyLoaded: true});
      }
    });
  }

  createMap({element, center, zoom = 8} = {}) {
    let _map = new google.maps.Map(element, {
      center: center,
      zoom: zoom
    })

    if (_map.__gm) {
      this._maps.push(_map);

      //Mejorar esto
      setTimeout(() => {
        _map.setCenter(center);
      }, 600);

      return _map;
    } else {
      throw new Error('Error creating map');
    }
  }

  getMaps() {
    return this._maps;
  }

  isLoaded() {
    return _libraryLoaded;
  };
}