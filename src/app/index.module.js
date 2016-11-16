(function () {
    'use strict';

    angular
        .module('inspinia', ['ngAnimate','ui.router',                    // Routing
            'oc.lazyLoad',                  // ocLazyLoad
            'ui.bootstrap',                 // Ui Bootstrap
            // 'pascalprecht.translate',       // Angular Translate
            'ngIdle',                       // Idle timer
            'ngSanitize'  // ngSanitize]);
        ])
})();
