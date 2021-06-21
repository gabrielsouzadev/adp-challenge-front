(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', exception);

    exception.$inject = ['Logger'];

    function exception(Logger) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function(reason) {
                Logger.error(message, reason);
            };
        }
    }
})();