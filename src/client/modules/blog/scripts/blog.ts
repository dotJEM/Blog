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
            resolve: {
                data: [<any>function () {
                    return { data: "Hello world" }
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
                data: [<any>function () {
                    return { data: "Hello world" }
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
                data: [<any>function () {
                    return { data: "Hello world" }
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
        $scope.model.archives = [
            { title: "March 2013", value: "2013-03-01" },
            { title: "April 2013", value: "2013-04-01" },
            { title: "May 2013", value: "2013-05-01" }
        ];
        $scope.model.categories = [
            { title: "JavaScript" },
            { title: "Angular" },
            { title: "Blog" }
        ];
    }]);

angular.module('dotjem.blog.blog').controller('blogListController', [<any>'$scope', 'data',
    function ($scope, data) {
        $scope.model.title = data.Title;
        $scope.model.articles = data.Contents;
    }]);

angular.module('dotjem.blog.blog').controller('blogPostController', [<any>'$scope', 'data',
    function ($scope, data) {
        $scope.model.title = "My Blog Post";
        $scope.model.content = {

            html: '\x3Cp\x3ELorem ipsum dolor sit amet, clita fierent sit id. Quo altera virtute at, detraxit sensibus honestatis et has. At melius perpetua vituperata vix. Sea ex unum corpora, no velit ridens eleifend eos, cu vis vero inermis.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nAd per hendrerit complectitur. At voluptua appellantur mel. Quo at vocibus repudiandae, aperiam rationibus dissentiunt no eum. Pro legimus accusata ex. Consul epicuri eu qui, id duo affert antiopam. Qui ad autem concludaturque. Pri postea audire scaevola an.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nNullam saperet ex eos, et blandit adipisci sea. Nam ut copiosae sensibus, ius ne graecis repudiare. Ubique mollis cum ea, congue philosophia pri ad, nec modo omnis praesent ex. Sit ignota prompta voluptaria ne, meliore accusam eam ut. Eam summo vitae et. Dicat mundi inciderint pro et, ex molestie scaevola eam. Exerci integre scribentur sed ei, sit paulo accusata percipitur id, virtute perpetua consectetuer eu mei.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nCu similique definiebas vel. Pri facer feugait assueverit ne, ea tale sanctus ius. Appetere disputando quo ut. Pro delectus splendide complectitur te. Modo prodesset his et, sed eu altera iudicabit.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nAperiri vituperatoribus eum ea. Cu qui percipit forensibus. Cu usu semper tibique reprimique, id paulo postea sit. Ut eum dicit temporibus, sumo deleniti delicatissimi et mea, mundi laoreet facilisi usu ea.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nEos te odio senserit conclusionemque. Nominavi explicari nam in, nec duis etiam tempor no. Mea duis affert imperdiet cu, sit ridens labore te. Cu duo blandit dignissim liberavisse, ei ferri doctus omnesque ius, vix movet causae intellegebat no. No prompta minimum pertinax pri, magna albucius at eos, nusquam volutpat mnesarchum at duo. Et per probo habeo perfecto. Eleifend antiopam vituperatoribus an duo, no quo mandamus referrentur.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nPro abhorreant mediocritatem ad. Ornatus senserit no cum, iudico dicunt veritus vis in. Esse posse inimicus no has. Nostrud platonem referrentur id sed.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nCu nec dicat dictas lucilius. Stet voluptaria percipitur te est, et falli latine vis. Ea nec suas nostrud civibus. Scripta tamquam utroque eam ad, altera antiopam id ius.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nEst deleniti tacimates an. Ea vis aperiam mediocritatem, eum commodo gubergren ad, wisi dolor meliore nam te. Vero iisque iudicabit sit ei, affert possim duo ad. Ea ius bonorum sensibus, omnis adipiscing pro ut, ad impedit eligendi principes eum. Cibo tota in cum.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nDelectus incorrupte ut eos. Eligendi necessitatibus per at. Ius modo fastidii accommodare no, ea magna utamur impedit qui. Error ullamcorper qui id.\n\x3C\x2Fp\x3E'
        };
    }]);
