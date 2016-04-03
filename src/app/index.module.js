import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
// Controllers
import { MainController } from './map/main.controller';
// Directives
import { windowHeight } from './components/windowHeight.directive'
// Service
import { markerService } from './services/markerService.service'

angular.module('testCs', ['ngAnimate', 'ngSanitize', 'ui.router', 'ngMaterial', 'toastr', 'uiGmapgoogle-maps'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('markerService', markerService)
  .controller('MainController', MainController)
  .directive('windowHeight', windowHeight);
