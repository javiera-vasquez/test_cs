export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider

    .state('home', {
      abstract: true,
      templateUrl: 'app/map/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })

    .state('home.map', {
      url: '/',
      views: {
        'sidebar': {
          templateUrl: 'app/map/sidebar.html'
        },
        'container': {
          templateUrl: 'app/map/container.html'
        }
      }
    });

    // .sate('home.about', {
    //   url: '/about',
    //   onEnter: function(){}
    // });

  $urlRouterProvider.otherwise('/');
}
