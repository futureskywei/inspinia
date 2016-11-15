(function () {
    'use strict';

    angular
        .module('inspinia')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('index', {
                abstract: true,
                url: "/index",
                templateUrl: "app/components/common/content.html"
            })
            .state('index.main', {
                url: "/main",
                templateUrl: "app/main/main.html",
                data: {pageTitle: 'Example view'}
            })
            .state('index.arch', {
                url: "/arch",
                templateUrl: "app/arch/arch.html",
                data: {pageTitle: 'arch'}
            });

        $urlRouterProvider.otherwise('/index/arch');
    }

})();
