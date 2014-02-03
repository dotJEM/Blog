angular.module('dotjem.blog.blog', ['dotjem.routing', 'dotjem.blog.core']);

angular.module('dotjem.blog.blog').config([
    '$stateProvider', '$moduleProvider',
    function ($stateProvider, $moduleProvider) {
        $moduleProvider.register('blog', { title: 'Blog', root: '/blog' });

        $stateProvider.state('blog', {
            route: '/blog',
            resolve: {
                data: [
                    'content', function (content) {
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
        }).state('blog.category', {
            route: '/category/:category',
            resolve: {
                data: [
                    '$to', 'content', function ($to, content) {
                        return { title: $to.$params.category, content: content.contents({ category: $to.$params.category }) };
                    }]
            },
            views: {
                'content': {
                    template: 'modules/blog/tpl/list.html',
                    controller: 'blogListController'
                }
            }
        }).state('blog.archive', {
            route: '/archive/:month',
            resolve: {
                data: [
                    '$to', 'content', function ($to, content) {
                        return { title: $to.$params.month, content: content.contents({ month: $to.$params.month }) };
                    }]
            },
            views: {
                'content': {
                    template: 'modules/blog/tpl/list.html',
                    controller: 'blogListController'
                }
            }
        }).state('blog.post', {
            route: '/{num:id}',
            resolve: {
                data: [
                    '$to', 'content', function ($to, content) {
                        return { content: content.contents({ id: $to.$params.id })[0] };
                    }]
            },
            views: {
                'content': {
                    template: 'modules/blog/tpl/post.html',
                    controller: 'blogPostController'
                }
            }
        }).state('blog.post.comment', {
            route: '/comments',
            scrollTo: 'comments'
        }).state('blog.post.comment.single', {
            route: '/{num:commentid',
            scrollTo: ['$state', function ($state) {
                    return 'comment-' + $state.current.$params.commentid;
                }]
        });
    }]);

angular.module('dotjem.blog.blog').controller('blogController', [
    '$scope', 'data',
    function ($scope, data) {
        $scope.model.archives = data.archives;
        $scope.model.categories = data.categories;
    }]);

angular.module('dotjem.blog.blog').controller('blogListController', [
    '$scope', 'data',
    function ($scope, data) {
        $scope.model.title = data.title;
        $scope.model.articles = data.content;
    }]);

angular.module('dotjem.blog.blog').controller('blogPostController', [
    '$scope', 'data',
    function ($scope, data) {
        $scope.model.title = data.content.title;
        $scope.model.content = data.content;
    }]);
