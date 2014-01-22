/// <reference path="../../../lib/scripts/assets.d.ts" />
/// <reference path="../../../core/scripts/dotjem.core.ts" />

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
            resolve: {
                data: [<any>'content' , function (content: IContentService) {
                    return {
                        title: "Blog",
                        archives: content.archives(),
                        categories: content.categories(),
                        content: content.contents({ type: 'article' })
                    };
                }]
            },
            views: {
                'root': {
                    sticky: true,
                    template: 'modules/blog/tpl/blog.html',
                    controller: 'blogController'
                },
                'content': {
                    template: 'modules/blog/tpl/list.html',
                    controller: 'blogListController'
                }
            }
        })
        .state('blog.category', {
            route: '/category/:category',
            resolve: {
                data: [<any>'$to', 'content' , function ($to, content: IContentService) {
                    return { title: $to.$params.category, content: content.contents({ category: $to.$params.category }) };
                }]
            },
            views: {
                'content': {
                    template: 'modules/blog/tpl/list.html',
                    controller: 'blogListController'
                }
            }
        })
        .state('blog.archive', {
            route: '/archive/:month',
            resolve: {
                data: [<any>'$to', 'content' , function ($to, content: IContentService) {
                    return { title: $to.$params.month, content: content.contents({ month: $to.$params.month }) };
                }]
            },
            views: {
                'content': {
                    template: 'modules/blog/tpl/list.html',
                    controller: 'blogListController'
                }
            }
        })
        .state('blog.post', {
            route: '/{num:id}',
            resolve: {
                data: [<any>'$to', 'content' , function ($to, content: IContentService) {
                    return { content: content.contents({ id: $to.$params.id })[0] };
                }]
            },
            views: {
                'content': {
                    template: 'modules/blog/tpl/post.html',
                    controller: 'blogPostController'
                }
            }
        })
        .state('blog.post.comment', {
            route: '/comments',
            scrollTo: 'comments'
        })
        .state('blog.post.comment.single', {
            route: '/{num:commentid',
            scrollTo: [<any>'$state', ($state) => { return 'comment-' + $state.current.$params.commentid; }]
        })
  }])

angular.module('dotjem.blog.blog').controller('blogController', [<any>'$scope', 'data',
    function ($scope, data) {
        $scope.model.archives = data.archives;
        $scope.model.categories = data.categories;
    }]);

angular.module('dotjem.blog.blog').controller('blogListController', [<any>'$scope', 'data',
    function ($scope, data) {
        $scope.model.title = data.title;
        $scope.model.articles = data.content;
    }]);

angular.module('dotjem.blog.blog').controller('blogPostController', [<any>'$scope', 'data',
    function ($scope, data) {
        $scope.model.title = data.content.title;
        $scope.model.content = data.content;
    }]);