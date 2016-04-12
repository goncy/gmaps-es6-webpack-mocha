import {} from './scss/main';
import MapManager from './js/MapManager';

let mapDiv = document.getElementById("map");
let mapManager = new MapManager();

mapManager.load().then(({manager, google, alreadyLoaded}) => {
  let mapa = manager.createMap({element: mapDiv, center: {lat: -34.7040225, lng: -58.308597}, zoom: 13});
  createMarker({mapa: mapa, center: {lat: -34.7040225, lng: -58.308597}});
});

function createMarker({mapa,center,title = "Hola mundo"} = {}) {
  return new google.maps.Marker({
    position: center,
    map: mapa,
    title: title,
    animation: google.maps.Animation.DROP
  });
}