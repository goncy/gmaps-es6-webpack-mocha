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
          resolve({google: _library, alreadyLoaded: false});
        });
      } else {
        resolve({google: _library, alreadyLoaded: true});
      }
    });
  }

  createMap(element, options = {}) {
    let self, _map, _loaded;

    self = this;
    _map = new _library.maps.Map(element),
    _loaded = new Promise((resolve, reject) => {
      _library.maps.event.addListenerOnce(_map, 'idle', function(){
        self._maps.push(_map);
        _map.setOptions(options);
        resolve(_map);
      });
    });

    return _loaded;
  }

  addMarker(mapa,options = {}) {
    let _options = Object.assign({map: mapa},options,{animation: _library.maps.Animation.DROP});
    let _marker = new _library.maps.Marker(_options);
    return _marker;
  }

  getMaps() {
    return this._maps;
  }

  isLoaded() {
    return _libraryLoaded;
  };
}