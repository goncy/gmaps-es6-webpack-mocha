import {} from './scss/main';
import MapManager from './js/MapManager';

let mapDiv = document.getElementById("map");
let mapManager = new MapManager();

mapManager.load().then(({google, alreadyLoaded}) => {
  mapManager.createMap(mapDiv).then( mapa => {
    mapa.setOptions({center: {lat: -34.7040225, lng: -58.308597}, zoom: 13});
    mapManager.addMarker(mapa, {position: {lat: -34.7040225, lng: -58.308597}, draggable: true});
  });
});