'use strict';

(function() {
    describe('Blocks logger', function() {
        var Logger, $window;
        var messages = {
            debug: 'Test a debug log',
            error: 'Test a error log',
            info : 'Test a info log',
            warn : 'Test a warn log'
        };

        beforeEach(angular.mock.module('blocks.logger'));

        beforeEach(inject(function(_$window_, _Logger_) {
            $window = _$window_;
            Logger = _Logger_;
        }));

        it('should have a debug log', function() {
            var currentLog;
            Logger.debug(messages.debug);

            currentLog = $window.Logger.$storage[0];

            expect(currentLog.type).toEqual('debug');
            expect(currentLog.message[0]).toEqual(messages.debug);
        });

        it('should have a error log', function() {
            var currentLog;
            Logger.error(messages.error);

            currentLog = $window.Logger.$storage[0];

            expect(currentLog.type).toEqual('error');
            expect(currentLog.message[0]).toEqual(messages.error);
        });

        it('should have a info log', function() {
            var currentLog;
            Logger.log(messages.info);

            currentLog = $window.Logger.$storage[0];

            expect(currentLog.type).toEqual('log');
            expect(currentLog.message[0]).toEqual(messages.info);
        });

        it('should have a warn log', function() {
            var currentLog;
            Logger.warn(messages.warn);

            currentLog = $window.Logger.$storage[0];

            expect(currentLog.type).toEqual('warn');
            expect(currentLog.message[0]).toEqual(messages.warn);
        });
    });
})();