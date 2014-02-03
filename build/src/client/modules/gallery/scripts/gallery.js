angular.module('dotjem.blog.gallery', ['dotjem.routing', 'dotjem.blog.core']);

angular.module('dotjem.blog.gallery').config([
    '$stateProvider', '$moduleProvider',
    function ($stateProvider, $moduleProvider) {
        $moduleProvider.register('gallery', { title: 'Gallery', root: '/gallery' });

        $stateProvider.state('gallery', {
            route: '/gallery',
            views: {
                'root': { template: 'modules/gallery/tpl/gallery.html' }
            }
        });
    }]);
