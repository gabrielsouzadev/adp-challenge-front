(function() {
    'use strict';

    angular
        .module('blocks.logger')
        .run(Run)
        .factory('Logger', Logger);

        Run.$inject = ['$window', 'Logger'];

        function Run($window, Logger) {
            $window.Logger = Logger;
        }

        function Logger() {
            var service = {
                $storage: [],
                debug   : debug,
                error   : error,
                log     : log,
                report  : report,
                warn    : warn
            };

            return service;

            function debug() {
                console.debug.apply(console, arguments);
                $$saveInStorage('debug', arguments);
            }

            function error() {
                console.error.apply(console, arguments);
                $$saveInStorage('error', arguments);
            }

            function log() {
                console.log.apply(console, arguments);
                $$saveInStorage('log', arguments);
            }

            function report() {
                console.log(service.$storage);
            }

            function warn() {
                console.warn.apply(console, arguments);
                $$saveInStorage('warn', arguments);
            }

            function $$saveInStorage(type, args) {
                var msgObj = {
                    type   : type,
                    date   : new Date(),
                    message: args
                };

                service.$storage.push(msgObj);

                return msgObj;
            }
        }
})();