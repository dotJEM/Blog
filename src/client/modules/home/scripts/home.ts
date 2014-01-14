
angular.module('dotjem.blog.home', ['dotjem.routing', 'dotjem.blog.core']);

angular.module('dotjem.blog.gallery').config([<any>'$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('home', {
        route: '/',
        views: {
          'root': { template: '??/??/??/home.html' }
        }
      })
  }]);