export function routerConfig($stateProvider, $urlRouterProvider) {
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
    })

    .state('home.map.about', {
      url: '/about',
      onEnter: ['$mdDialog', '$state', function($mdDialog, $state) {

        alert = $mdDialog.alert()
          .title('Attention, ')
          .textContent('This is an example of how easy dialogs can be!')
          .ok('Close');
        $mdDialog
          .show(alert)
          .then(() => {
            $state.go('home.map');
          });

      }]
    });


  $urlRouterProvider.otherwise('/');
}
