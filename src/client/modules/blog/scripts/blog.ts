/// <reference path="../../../lib/scripts/assets.d.ts" />

angular.module('dotjem.blog.blog', ['dotjem.routing', 'dotjem.blog.core']);

angular.module('dotjem.blog.blog').config([<any>'$stateProvider', '$moduleProvider',
    function ($stateProvider, $moduleProvider) {
    $moduleProvider.register('blog', { title: 'Blog', root: '/blog' });
    //TODO: there are multiple things to note here...
    //       - 1. Naming of the 'root' state is the same as the module.
    //       - 2. Root URL is the modules root.
    //       - 3. The module makes these 2 choices which makes it harder to actually configure.
    //
    // But for now all this is ok as we really just need to get started, but at some point we need a smarter way.
    $stateProvider
      .state('blog', {
        route: '/blog',
        views: {
          'root': { template: 'modules/blog/tpl/blog.html' }
        }
      })
  }]);