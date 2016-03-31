export function runBlock ($log, $rootScope, $window) {
  'ngInject';
  $rootScope._ = $window._;
  $log.debug('runBlock end');
}
