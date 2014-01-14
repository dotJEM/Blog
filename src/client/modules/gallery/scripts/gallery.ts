
angular.module('dotjem.blog.gallery', ['dotjem.routing', 'dotjem.blog.core']);

angular.module('dotjem.blog.gallery').config([<any>'$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('gallery', {
        route: '/gallery',
        views: {
          'root': { template: '??/??/??/gallery.html' }
        }
      })
  }]);