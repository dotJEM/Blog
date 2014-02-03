angular.module('dotjem.blog.home', ['dotjem.routing', 'dotjem.blog.core']);

angular.module('dotjem.blog.home').config([
    '$stateProvider', '$moduleProvider',
    function ($stateProvider, $moduleProvider) {
        $moduleProvider.register('home', { title: 'Home', root: '/' });

        $stateProvider.state('home', {
            route: '/',
            views: {
                'root': { template: 'modules/home/tpl/home.html' }
            }
        });
    }]);
