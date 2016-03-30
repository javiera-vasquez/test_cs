export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider

    .state('demo', {
      url: '/example',
      templateUrl: 'app/main/main.html',
      controller: 'DemoController',
      controllerAs: 'main'
    })

    .state('home', {
      abstract: true,
      templateUrl: 'app/map/main.html',
      controller: function(){console.log('main')},
      controllerAs: 'main',
    })

    .state('home.map', {
      url: '/',
      views: {
        'sidebar': {
          template: 'sidebar',
        },
        'container': {
          template: 'map container',
        }
      }
    });

    // .sate('home.about', {
    //   url: '/about',
    //   onEnter: function(){}
    // });

  $urlRouterProvider.otherwise('/');
}
