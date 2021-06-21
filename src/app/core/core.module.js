(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngResource',
            'angular-cache',
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            'ui.router',
            'oc.lazyLoad'
        ]);
})();