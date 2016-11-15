(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state) {
    $rootScope.$state = $state;
    // $log.debug('runBlock end');
  }

})();
