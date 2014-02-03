angular.module('dotjem.blog.portfolio', ['dotjem.routing', 'dotjem.blog.core']);

angular.module('dotjem.blog.portfolio').config([
    '$stateProvider', '$moduleProvider',
    function ($stateProvider, $moduleProvider) {
        $moduleProvider.register('portfolio', { title: 'Portfolio', root: '/portfolio' });

        $stateProvider.state('portfolio', {
            route: '/portfolio',
            views: {
                'root': { template: 'modules/portfolio/tpl/portfolio.html' }
            }
        });
    }]);
