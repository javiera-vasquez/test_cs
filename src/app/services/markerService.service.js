export function markerService($http, $q, $log) {
  'ngInject'

  const service = {
    getMarkers: getMarkers,
    removeMarker: removeMarker,
    addMarker: addMarker
  }

  return service;

  function getMarkers() {
    let defered = $q.defer();

    $http.get('./assets/markers.json').success(res => {
      $log.debug('Respond from service', res);
      defered.resolve(res);
    }).error(() => {
      defered.reject('fail')
    });

    return defered.promise;
  }

  function addMarker(list, marker) {
    list.push(marker);
  }

  function removeMarker(list, marker) {
    _.remove(list, (obj) => {
      return obj.id === marker.id;
    })
  }

}

