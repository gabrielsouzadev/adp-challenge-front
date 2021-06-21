'use strict';

(function() {
    describe('Table directive', function() {
        
        beforeEach(angular.mock.module('app.widgets'));

        var $controller, element;

        beforeEach(inject(function ($compile, $httpBackend, $rootScope) {
            $httpBackend.expectGET('app/widgets/table/table.html').respond(200, '');
            
            element = $compile(`
                <ui-table 
                    fields="[]" 
                    data="[
                        {id:1},{id:2},{id:3},{id:4},{id:5},
                        {id:6},{id:7},{id:8},{id:9},{id:10},
                        {id:6},{id:7},{id:8},{id:9},{id:10},
                        {id:6},{id:7},{id:8},{id:9},{id:10},
                        {id:6},{id:7},{id:8},{id:9},{id:10}
                    ]"
                ></ui-table>`
            )($rootScope);
            
            $rootScope.$digest();
            $httpBackend.flush();
            
            $controller = element.controller('ui-table');
        }));
        
        it('should return next page', function() {
            $controller.nextPage();
            $controller.nextPage();

            expect($controller.currentPage).toEqual(2);
        });

        it('should return prev page', function() {
            $controller.nextPage();
            $controller.nextPage();
            $controller.prevPage();

            expect($controller.currentPage).toEqual(1);
        });


        it('should return prev disabled class', function() {
            $controller.currentPage = 0;
            expect($controller.prevPageDisabled()).toEqual('disabled');
        });

        it('should return next disabled class', function() {
            $controller.currentPage = 4;
            expect($controller.nextPageDisabled()).toEqual('disabled');
        });

        it('should return page count', function() {
            expect($controller.pageCount()).toEqual(4);
        });

        it('should set page', function() {
            $controller.setPage(3);
            expect($controller.currentPage).toEqual(3);
        });

        it('should select row', function() {
            for (var i=0; i<5; i++) {
                $controller.selectRow({ id: i });
            }
            
            expect($controller.rows.length).toEqual(5);
        });
    });
})();