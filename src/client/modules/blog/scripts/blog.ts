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
                data: [<any>function () {
                    return { data: "Hello world" }
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
        $scope.model.title = "My Blog Post";
        $scope.model.content = temp.article("My Blog Post");
    }]);

var temp = {
    id: 1,
    html: '\x3Cp\x3ELorem ipsum dolor sit amet, clita fierent sit id. Quo altera virtute at, detraxit sensibus honestatis et has. At melius perpetua vituperata vix. Sea ex unum corpora, no velit ridens eleifend eos, cu vis vero inermis.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nAd per hendrerit complectitur. At voluptua appellantur mel. Quo at vocibus repudiandae, aperiam rationibus dissentiunt no eum. Pro legimus accusata ex. Consul epicuri eu qui, id duo affert antiopam. Qui ad autem concludaturque. Pri postea audire scaevola an.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nNullam saperet ex eos, et blandit adipisci sea. Nam ut copiosae sensibus, ius ne graecis repudiare. Ubique mollis cum ea, congue philosophia pri ad, nec modo omnis praesent ex. Sit ignota prompta voluptaria ne, meliore accusam eam ut. Eam summo vitae et. Dicat mundi inciderint pro et, ex molestie scaevola eam. Exerci integre scribentur sed ei, sit paulo accusata percipitur id, virtute perpetua consectetuer eu mei.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nCu similique definiebas vel. Pri facer feugait assueverit ne, ea tale sanctus ius. Appetere disputando quo ut. Pro delectus splendide complectitur te. Modo prodesset his et, sed eu altera iudicabit.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nAperiri vituperatoribus eum ea. Cu qui percipit forensibus. Cu usu semper tibique reprimique, id paulo postea sit. Ut eum dicit temporibus, sumo deleniti delicatissimi et mea, mundi laoreet facilisi usu ea.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nEos te odio senserit conclusionemque. Nominavi explicari nam in, nec duis etiam tempor no. Mea duis affert imperdiet cu, sit ridens labore te. Cu duo blandit dignissim liberavisse, ei ferri doctus omnesque ius, vix movet causae intellegebat no. No prompta minimum pertinax pri, magna albucius at eos, nusquam volutpat mnesarchum at duo. Et per probo habeo perfecto. Eleifend antiopam vituperatoribus an duo, no quo mandamus referrentur.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nPro abhorreant mediocritatem ad. Ornatus senserit no cum, iudico dicunt veritus vis in. Esse posse inimicus no has. Nostrud platonem referrentur id sed.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nCu nec dicat dictas lucilius. Stet voluptaria percipitur te est, et falli latine vis. Ea nec suas nostrud civibus. Scripta tamquam utroque eam ad, altera antiopam id ius.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nEst deleniti tacimates an. Ea vis aperiam mediocritatem, eum commodo gubergren ad, wisi dolor meliore nam te. Vero iisque iudicabit sit ei, affert possim duo ad. Ea ius bonorum sensibus, omnis adipiscing pro ut, ad impedit eligendi principes eum. Cibo tota in cum.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nDelectus incorrupte ut eos. Eligendi necessitatibus per at. Ius modo fastidii accommodare no, ea magna utamur impedit qui. Error ullamcorper qui id.\n\x3C\x2Fp\x3E',
    list: function(category) {
        switch(category){
            case "JavaScript":
                return [
                    temp.article("JavaScript Article 1"),
                    temp.article("JavaScript Article 1"),
                    temp.article("JavaScript Article 1"),
                    temp.article("JavaScript Article 1"),
                    temp.article("JavaScript Article 1")
                ];
            case "Angular":
                return [
                    temp.article("Angular Article 1"),
                    temp.article("Angular Article 2"),
                    temp.article("Angular Article 3"),
                    temp.article("Angular Article 4")
                ];
            case "Blog":
                return [
                    temp.article("Blog Article 1"),
                    temp.article("Blog Article 2"),
                    temp.article("Blog Article 3")
                ];
            default:
                return [
                    { id: 1, title: "Article 1", html: temp.html },
                    { id: 2, title: "Article 2", html: temp.html }
                ]
        }
    },
    article: function(title){
        return {
            id: temp.id++,
            title: title,
            tags: [ { title: "tagged" } ],
            childCount: 42,
            html: temp.html,
            author: 'John Doe'
        }
    }
}

