export class MainController {
  constructor($log, $http, $scope, markerService, uiGmapGoogleMapApi) {
    'ngInject'

    let mv = this;

    mv.map = {};
    mv.marker = {};
    mv.markers = [];
    mv.addMarker = addMarker;
    mv.removeMarker = removeMarker;
    mv.mapConfig = mapConfig();
    mv.pageTitle = 'Gmaps markers';

    activate();

    function activate() {
      return getMap().then(() => {
        $log.debug('Activated gmaps');
      }).then(() => {
        return getMarkers().then(() => {
          $log.debug('Activated markers list');
        })
      }).then(() => {
        getSearch();
        getPoint();
      });
    }

    function addMarker() {
      // var asdf = { "id": "4", "coords": { "latitude": "-32.4179935", "longitude": "-70.6063901" }, "window": { "title": "Costanera Centers" } };
      //markerService.addMarker(mv.markers, asdf);
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
          center: mv.mapConfig.center,
          zoom: 10,
          pan: 0,
          options: mv.mapConfig.options,
          control: {}
        };
      });
    }

    function getSearch() {
      let input = document.getElementById('searchbox');
      let searchBox = new google.maps.places.SearchBox(input);

      searchBox.addListener('places_changed', function() {
        let places = searchBox.getPlaces();
        let lat = places[0].geometry.location.lat();
        let len = places[0].geometry.location.lng();

        $log.debug(searchBox, lat, len);

        mv.marker.coords = {
          latitude: lat,
          longitude: len
        };

        mv.map.center = {
          latitude: lat,
          longitude: len
        };

      });
    }

    function getPoint() {
      return mv.marker = {
        id: 0,
        coords: {},
        options: { draggable: true },
        events: {
          dragend: function(marker, eventName, args) {
            $log.log('marker dragend');
            var lat = marker.getPosition().lat();
            var lon = marker.getPosition().lng();
            $log.log(lat);
            $log.log(lon);
          }
        }
      };
    }

    function mapConfig() {
      return {
        center: {
          latitude: -33.4488897,
          longitude: -70.6692655
        },
        options: {
          minZoom: 5,
          zoomControl: true,
          draggable: true,
          scrollwheel: true,
          navigationControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: false,
          disableDoubleClickZoom: false,
          keyboardShortcuts: true
        }
      }
    }

    $log.debug('loading main controller')
  }
}
