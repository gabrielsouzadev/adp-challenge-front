(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .config(exceptionConfig);

    exceptionConfig.$inject = ['$provide'];

    function exceptionConfig($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    extendExceptionHandler.$inject = ['$delegate', 'Logger'];

    function extendExceptionHandler($delegate, Logger) {
        return function(exception, cause) {
            $delegate(exception, cause);
            var errorData = {
                exception: exception,
                cause: cause
            };

            Logger.error(exception.msg, errorData);

            $delegate(exception, cause);
        };
    }
})();