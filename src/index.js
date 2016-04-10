import {} from './scss/main';
import Mapa from './js/Map';

let map = new Mapa({targetDivId: 'map'});

map.then( mapa => {
  createMarker(mapa);
});

map.catch( (err) => {
  alert(err);
});

function createMarker(mapa) {
  return new google.maps.Marker({
    position: {lat: -34.397, lng: 150.644},
    map: mapa,
    title: 'Hello World!'
  });
}