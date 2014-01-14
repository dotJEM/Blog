
angular.module('dotjem.blog.about', ['dotjem.routing', 'dotjem.blog.core']);

angular.module('dotjem.blog.about').config([<any>'$routeProvider', '$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('about', {
        route: '/about',
        views: {
          'root': { template: '??/??/??/about.html' }
        }
      })
  }]);