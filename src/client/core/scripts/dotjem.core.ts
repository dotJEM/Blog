/// <reference path="../../lib/scripts/assets.d.ts" />

angular.module('dotjem.blog.core', ['dotjem.routing']);

//TODO: Move to file
var $ModuleProvider = [<any>
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
  }];

angular.module('dotjem.blog.core').provider('$module', $ModuleProvider);

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
            compile: function (element, attr) {
                return function (scope, element, attr) {
                    var srcExp = attr.jmCompileBind || attr.src;

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

angular.module('dotjem.blog.core').directive('dbBind', jmCompileBindDirective);