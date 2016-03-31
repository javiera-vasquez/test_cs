export class MainController {
  constructor($log, uiGmapGoogleMapApi, uiGmapIsReady) {
    'ngInject'

    let mv = this;
    let google = {};

    mv.markers = [
      {
        "id": "0",
        "coords": {
          "latitude": "45.5200",
          "longitude": "-122.6819"
        },
        "window": {
          "title": "Portland, OR"
        }
      },
      {
        "id": "1",
        "coords": {
          "latitude": "40.7903",
          "longitude": "-73.9597"
        },
        "window": {
          "title": "Manhattan New York, NY"
        }
      },
      {
        "id": "2",
        "coords": {
          "latitude": "10.7903",
          "longitude": "-73.9597"
        },
        "window": {
          "title": "Manhattan New York, NY"
        }
      }
    ];

    mv.pageTitle = 'Gmaps markers';

    // return promise of google maps
    uiGmapGoogleMapApi.then((maps) => {

      mv.googlemap = {};

      mv.map = {
        center: {        // set on San Francisco as initial default
          latitude: 37.7749295,
          longitude: -122.4194155
        },
        zoom: 5,
        pan: 1,
        options: {
          minZoom: 3,
          zoomControl: false,
          draggable: true,
          navigationControl: false,
          mapTypeControl: false,
          scaleControl: false,
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
      mv.map.center = $scope.myCurrentLocation;

    });

    uiGmapIsReady.promise()					    // this gets all (ready) map instances - defaults to 1 for the first map
      .then(function(instances) {					// instances is an array object
        var maps = instances[0].map;			// if only 1 map it's found at index 0 of array
        mv.myOnceOnlyFunction(maps);        // this function will only be applied on initial map load (once ready)
      });


    mv.myOnceOnlyFunction = function(maps) {
      var center = maps.getCenter();
      var lat = center.lat();
      var lng = center.lng();
      console.log('I\'ll only say this once ! \n Lat : ' + lat + '\n Lng : ' + lng);
    };

    $log.debug('loading main controller')
  }
}
