angular.module('dotjem.blog.about', ['dotjem.routing', 'dotjem.blog.core']);

angular.module('dotjem.blog.about').config([
    '$stateProvider', '$moduleProvider',
    function ($stateProvider, $moduleProvider) {
        $moduleProvider.register('about', { title: 'About', root: '/about' });

        $stateProvider.state('about', {
            route: '/about',
            views: {
                'root': { template: 'modules/about/tpl/about.html' }
            }
        });
    }]);
