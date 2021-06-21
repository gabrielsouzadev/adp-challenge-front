'use strict';

(function() {
    describe('Blocks Router', function() {
        var testeRoute;
        var $rootScope, $state, routerHelper, $httpBackend;

        beforeEach(angular.mock.module('blocks.router'));

        beforeEach(inject(function(_$rootScope_, _$state_, _routerHelper_, _$httpBackend_) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            routerHelper = _routerHelper_;
            $httpBackend = _$httpBackend_;

            $httpBackend.expectGET('teste.html').respond(200, '');
            
            testeRoute = getTestRoute();
            routerHelper.configureStates(testeRoute);
            
            $state.transitionTo('teste');
            
            $httpBackend.flush();
            
            $rootScope.$apply();
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should route be defined', function() {            
            expect($state.href('teste')).toBeDefined();
        });

        it('should route be same config', function() {
            var currentRoute = getTestRoute()[0];

            expect($state.current.name).toEqual(currentRoute.config.name);
            expect($state.current.title).toEqual(currentRoute.config.title);
            expect($state.current.url).toEqual(currentRoute.config.url);
            expect($state.current.templateUrl).toEqual(currentRoute.config.templateUrl);
            expect($state.current.controller).toEqual(currentRoute.config.controller);
        });

        function getTestRoute(index) {
            var test = 'teste' + (index || '');
            return [
                {
                    state: test,
                    config: {
                        name: test,
                        title: test,
                        url: '/' + test,
                        templateUrl: test + '.html',
                        controller: test + 'Controller',
                        controllerAs: 'vm'
                    }
                }
            ];
        };
    });
})();