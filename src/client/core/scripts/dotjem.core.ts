/// <reference path="../../lib/scripts/assets.d.ts" />
/// <reference path="classes/DateFormat.ts" />

angular.module('dotjem.blog.core', ['dotjem.routing']);

//TODO: Move to file
angular.module('dotjem.blog.core').provider('$module', [<any>
    function() {
        var modules = {};

        this.register = function(name, mod){
            modules[name] = mod;
            modules[name].name = name;
        };

        this.$get = [<any>function(){
            var service: any = {};

            service.modules = modules;
            service.all = function(){
                var mods = [];
                angular.forEach(modules, function(value) {
                    mods.push(value);
                });
                return mods;
            };

            return service;
        }]
    }]);

angular.module('dotjem.blog.core').controller('siteController', [<any>'$scope','$module','$state',
    function($scope, $module, $state){
        $scope.model = $scope.model || {};
        $scope.model.modules = $module.all();
    }]);

var jmCompileBindDirective = [<any>'$compile',
    function ($compile) {
        'use strict';
        return {
            restrict: 'ECA',
            compile: function () {
                return function (scope, element, attr) {
                    var srcExp = attr.dbCompile || attr.src;

                    element.addClass('ng-binding').data('$binding', attr.ngBind);
                    scope.$watch(srcExp, (src) => {
                        if (src) {
                            element.html(src);
                            $compile(element.contents())(scope);
                        } else {
                            element.html('');
                        }
                    });
                }
            }
        };
    }];

angular.module('dotjem.blog.core').directive('dbCompile', jmCompileBindDirective);

interface IContent {
    id: number;
    type: string;
    title: string;
    tags: any;
    childCount: number;
    html: string;
    author: string;
    created: Date;
    ref: number;
}

interface IContentService {
    categories(): IContent[];
    archives(): IContent[];
    contents(filter?: any): IContent[];
}

angular.module('dotjem.blog.core').provider('content', [<any>function(){

    var id=1;
    var contents: IContent[] = [];
    var html= '\x3Cp\x3ELorem ipsum dolor sit amet, clita fierent sit id. Quo altera virtute at, detraxit sensibus honestatis et has. At melius perpetua vituperata vix. Sea ex unum corpora, no velit ridens eleifend eos, cu vis vero inermis.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nAd per hendrerit complectitur. At voluptua appellantur mel. Quo at vocibus repudiandae, aperiam rationibus dissentiunt no eum. Pro legimus accusata ex. Consul epicuri eu qui, id duo affert antiopam. Qui ad autem concludaturque. Pri postea audire scaevola an.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nNullam saperet ex eos, et blandit adipisci sea. Nam ut copiosae sensibus, ius ne graecis repudiare. Ubique mollis cum ea, congue philosophia pri ad, nec modo omnis praesent ex. Sit ignota prompta voluptaria ne, meliore accusam eam ut. Eam summo vitae et. Dicat mundi inciderint pro et, ex molestie scaevola eam. Exerci integre scribentur sed ei, sit paulo accusata percipitur id, virtute perpetua consectetuer eu mei.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nCu similique definiebas vel. Pri facer feugait assueverit ne, ea tale sanctus ius. Appetere disputando quo ut. Pro delectus splendide complectitur te. Modo prodesset his et, sed eu altera iudicabit.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nAperiri vituperatoribus eum ea. Cu qui percipit forensibus. Cu usu semper tibique reprimique, id paulo postea sit. Ut eum dicit temporibus, sumo deleniti delicatissimi et mea, mundi laoreet facilisi usu ea.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nEos te odio senserit conclusionemque. Nominavi explicari nam in, nec duis etiam tempor no. Mea duis affert imperdiet cu, sit ridens labore te. Cu duo blandit dignissim liberavisse, ei ferri doctus omnesque ius, vix movet causae intellegebat no. No prompta minimum pertinax pri, magna albucius at eos, nusquam volutpat mnesarchum at duo. Et per probo habeo perfecto. Eleifend antiopam vituperatoribus an duo, no quo mandamus referrentur.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nPro abhorreant mediocritatem ad. Ornatus senserit no cum, iudico dicunt veritus vis in. Esse posse inimicus no has. Nostrud platonem referrentur id sed.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nCu nec dicat dictas lucilius. Stet voluptaria percipitur te est, et falli latine vis. Ea nec suas nostrud civibus. Scripta tamquam utroque eam ad, altera antiopam id ius.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nEst deleniti tacimates an. Ea vis aperiam mediocritatem, eum commodo gubergren ad, wisi dolor meliore nam te. Vero iisque iudicabit sit ei, affert possim duo ad. Ea ius bonorum sensibus, omnis adipiscing pro ut, ad impedit eligendi principes eum. Cibo tota in cum.\n  \x3C\x2Fp\x3E\n  \x3Cp\x3E\nDelectus incorrupte ut eos. Eligendi necessitatibus per at. Ius modo fastidii accommodare no, ea magna utamur impedit qui. Error ullamcorper qui id.\n\x3C\x2Fp\x3E';
    var titleFormat = new dotjem.DateFormat('MMMM yyyy');
    var valueFormat = new dotjem.DateFormat('yyyy-MM');

    function parseDate(input) {
        var parts = input.split('-');
        // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
    }

    function content(type: string, title: string, datestr: string, ref?: number){
        var item: IContent = {
            id: id++,
            type: type,
            title: title,
            tags: [ { title: 'tagged' }, { title: 'tucked' }, { title: 'towed' } ],
            childCount: 42,
            html: html,
            author: 'John Doe',
            created: parseDate(datestr),
            ref: ref
        };
        contents.push(item);
        return item;
    }

    var jsCat = content("category", "JavaScript", "2014-01-05");
    content("article", "JavaScript Article 1", "2014-01-05", jsCat.id);
    content("article", "JavaScript Article 2", "2014-02-05", jsCat.id);
    content("article", "JavaScript Article 3", "2014-03-05", jsCat.id);
    content("article", "JavaScript Article 4", "2014-03-05", jsCat.id);
    content("article", "JavaScript Article 5", "2014-04-05", jsCat.id);

    var anCat = content("category", "Angular", "2014-01-5");
    content("article", "Angular Article 1", "2014-01-05", anCat.id);
    content("article", "Angular Article 2", "2014-03-05", anCat.id);
    content("article", "Angular Article 3", "2014-04-05", anCat.id);

    var blCat = content("category", "Blog", "2014-01-5");
    content("article", "Blog Article 1", "2014-01-05", blCat.id);
    content("article", "Blog Article 2", "2014-02-05", blCat.id);
    content("article", "Blog Article 3", "2014-02-05", blCat.id);
    content("article", "Blog Article 4", "2014-04-05", blCat.id);

    function buildFilterFunction(filter?: any){
        var fn, filters, category;
        if(angular.isDefined(filter.category)){
            angular.forEach(contents, function(value){
                if(value.type === "category" && filter.category == value.title){
                    category = value;
                }
            });

            fn = function(value){
                return value.ref === category.id;
            }
        } else if(angular.isDefined(filter.month)){
            fn = function(value){
                return valueFormat.format(value.created) === filter.month;
            }
        } else {
            filters = []
            angular.forEach(filter, function(value, key){
                filters.push(function(target){
                    return target[key] === value;
                })
            })
            fn = function(value){
                for(var i = 0; i < filters.length; i++){
                    if(!filters[i](value)){
                        return false;
                    }
                }
                return true;
            }
        }
        return fn;
    }

    this.$get = [<any>function() {
        var self: any = {};
        self.categories = function() {
            var list = [];
            angular.forEach(contents, function(value){
                if(value.type === "category"){
                    list.push(value);
                }
            });
            return list;
        };
        self.archives = function() {
            var map: any = {};
            angular.forEach(contents, function(value){
                if(value.type === "article"){
                    var month = value.created.getMonth();

                    var str = valueFormat.format(value.created);
                    if(!(str in map)){
                        map[str] = value.created;
                    }
                }
            });
            var list = [];
            angular.forEach(map, function(value){
                list.push({
                    title: titleFormat.format(value),
                    value: valueFormat.format(value)
                })
            });
            return list;
        };
        self.contents = function(filter?: any){
            var fn, list = [];
            if( angular.isUndefined(filter)){
                fn = function() {
                    return true;
                }
            } else {
                fn=buildFilterFunction(filter);
            }

            angular.forEach(contents, function(value){
                if(fn(value)) {
                    list.push(value);
                }
            })
            return list;
        }
        return self;
    }]
}]);
