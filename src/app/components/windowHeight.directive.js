/* global _:false */
export function windowHeight($window, $log) {
  'ngInject'

  return function link(scope, element) {

    var windowContent = angular.element($window);

    function setHeight() {
      var windowHeight = $window.innerHeight;
      element.css('height', windowHeight + 'px');
    }

    // init's
    setHeight();

    // height in resize
    windowContent.on('resize', _.debounce(setHeight, 250));
    windowContent.on('$destroy', setHeight());

  }

}