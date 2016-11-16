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
                data: {pageTitle: 'arch'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                serie: true,
                                files: ['app/js/plugins/dataTables/datatables.min.js', 'app/css/plugins/dataTables/datatables.min.css']
                            },
                            {
                                serie: true,
                                name: 'datatables',
                                files: ['app/js/plugins/dataTables/angular-datatables.min.js']
                            },
                            {
                                serie: true,
                                name: 'datatables.buttons',
                                files: ['app/js/plugins/dataTables/angular-datatables.buttons.min.js']
                            },
                            {
                                insertBefore: '#loadBefore',
                                name: 'toaster',
                                files: ['app/js/plugins/toastr/toastr.min.js', 'app/css/plugins/toastr/toastr.min.css']
                            }, {
                                files: ['app/js/plugins/sweetalert/sweetalert.min.js', 'app/css/plugins/sweetalert/sweetalert.css']
                            },
                            {
                                name: 'oitozero.ngSweetAlert',
                                files: ['app/js/plugins/sweetalert/angular-sweetalert.min.js']
                            }
                        ]);
                    }
                }
            });

        $urlRouterProvider.otherwise('/index/arch');
    }

})();
