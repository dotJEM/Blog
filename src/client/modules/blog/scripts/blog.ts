
angular.module('dotjem.blog.blog', ['dotjem.routing', 'dotjem.blog.core']);

angular.module('dotjem.blog.blog').config([<any>'$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('blog', {
        route: '/blog',
        views: {
          'root': { template: '??/??/??/blog.html' }
        }
      })
  }]);