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
    mv.show = false;

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
        setPoint();
      });
    }

    function addMarker() {
      let len = mv.markers.length;
      let marker = {
        id: len,
        coords: {
          latitude: mv.marker.coords.latitude,
          longitude: mv.marker.coords.longitude
        },
        window: {
          title: mv.location.name
        }
      };

      markerService.addMarker(mv.markers, marker);

      mv.location = {
        name: '',
        direction: ''
      };

      mv.marker = {
        id: 0,
        coords: {
          latitude: 0,
          longitude: 0
        }
      };
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

        mv.map = {
          zoom: 15,
          center: {
            latitude: lat,
            longitude: len
          }
        }

        mv.marker.coords = {
          latitude: lat,
          longitude: len
        };

      });
    }

    function setPoint() {
      return mv.marker = {
        id: 0,
        coords: {},
        options: { draggable: true },
        events: {
          dragend: (marker) => {
            let lat = marker.getPosition().lat();
            let lon = marker.getPosition().lng();
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
