export class MainController {
  constructor($log, $http, markerService, uiGmapGoogleMapApi, uiGmapIsReady) {
    'ngInject'

    let mv = this;

    mv.map = {};
    mv.markers = [];
    mv.addMarker = addMarker;
    mv.removeMarker = removeMarker;
    mv.pageTitle = 'Gmaps markers';

    activate();

    function activate() {
      return getMap().then(() => {
          $log.debug('Activated gmaps');
        }).then(() => {
          return getMarkers().then(() => {
            $log.debug('Activated markers list');
          })
        });
    }

    function addMarker(marker) {
      var asdf = { "id": "4", "coords": { "latitude": "-32.4179935", "longitude": "-70.6063901" }, "window": { "title": "Costanera Centers" } };
      markerService.addMarker(mv.markers, asdf);
    }

    function removeMarker(marker) {
      $log.debug(marker);
      markerService.removeMarker(mv.markers, marker);
    }

    function getMarkers() {
      return markerService.getMarkers().then((res) => {
        mv.markers = res;
      })
    }

    function getMap() {
      return uiGmapGoogleMapApi.then((maps) => {

        mv.map = {
          center: {
            latitude: -33.4488897,
            longitude: -70.6692655
          },
          zoom: 7,
          pan: 1,
          options: {
            minZoom: 5,
            zoomControl: true,
            draggable: true,
            navigationControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: false,
            disableDoubleClickZoom: false,
            keyboardShortcuts: true,
          },
          control: {},
          events: {
            tilesloaded: function(maps, eventName, args) {
              console.log('The ' + eventName + ' function fires every time you move or zoom the map');
            },
            dragend: function(maps, eventName, args) {
              console.log('The ' + eventName + ' function fires every time you drag the map');
            },
            zoom_changed: function(maps, eventName, args) {
              console.log('The ' + eventName + ' function fires every time you zoom');
            }
          }
        };

      });
    }

    $log.debug('loading main controller')
  }
}
