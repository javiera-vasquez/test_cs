export function config ($logProvider, $mdThemingProvider, uiGmapGoogleMapApiProvider, toastrConfig) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;

  // Theme setting
  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('deep-orange')
    .warnPalette('blue-grey');

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyALUGz_xsMgKh55NqaqYZlIW9g4Wokl3Nw',
    v: '3.22',
    libraries: 'places,geometry,visualization'
  })

}
