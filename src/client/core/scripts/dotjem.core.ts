angular.module('dotjem.blog.core', ['dotjem.routing']);

//TODO: Move to file
var $ModuleProvider = [<any>'$stateProvider',
  function($stateProvider) {

    this.install = function(moduledef){


    }


    this.$get = [<any>function(){}]
  }];

angular.module('dotjem.blog.core').provider('$module', $ModuleProvider);