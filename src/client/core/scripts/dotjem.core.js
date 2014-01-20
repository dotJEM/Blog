/// <reference path="../../lib/scripts/assets.d.ts" />
angular.module('dotjem.blog.core', ['dotjem.routing']);

//TODO: Move to file
var $ModuleProvider = [function () {
        var modules = {};

        this.register = function (name, mod) {
            modules[name] = mod;
            modules[name].name = name;
        };

        this.$get = [function () {
                var service = {};

                service.modules = modules;
                service.all = function () {
                    var mods = [];
                    angular.forEach(modules, function (value) {
                        mods.push(value);
                    });
                    return mods;
                };

                return service;
            }];
    }];

angular.module('dotjem.blog.core').provider('$module', $ModuleProvider);

angular.module('dotjem.blog.core').controller('siteController', [
    '$scope', '$module', '$state',
    function ($scope, $module, $state) {
        $scope.model = $scope.model || {};
        $scope.model.modules = $module.all();
    }]);
//# sourceMappingURL=dotjem.core.js.map
