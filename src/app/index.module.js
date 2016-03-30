/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

import { MainController } from './map/main.controller';

angular.module('testCs', ['ngAnimate', 'ngSanitize', 'ui.router', 'ngMaterial', 'toastr'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
