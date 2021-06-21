'use strict';

(function() {
    describe('Github Routes', function() {
        var state = 'github';
        var view = 'app/github/github.html';
        var $state, $rootScope;

        beforeEach(angular.mock.module('blocks.router'));
        beforeEach(angular.mock.module('app.github'));
        beforeEach(angular.mock.module('app.core'));

        beforeEach(inject(function(_$rootScope_, _$state_, $templateCache) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $templateCache.put(view, '');
        }));

        it('should map / route to github main view template', function() {
            $state.go(state);
            expect($state.href(state)).toBeDefined();
        });
    });
})();