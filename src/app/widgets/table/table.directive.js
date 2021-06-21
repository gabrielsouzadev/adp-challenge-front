(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('uiTable', uiTable);

    function uiTable() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/widgets/table/table.html',
            scope: {
                fields: '=',
                data: '=',
                onSelectRow: '&'
            },
            controller: uiTableController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    function uiTableController($scope) {
        var vm = this;
        
        vm.$onInit = onInit;
        
        vm.prevPage = prevPage;
        vm.nextPage = nextPage;
        vm.prevPageDisabled = prevPageDisabled;
        vm.nextPageDisabled = nextPageDisabled;
        vm.pageCount = pageCount;
        vm.setPage = setPage;
        vm.selectRow = selectRow;
        vm.isRowSelected = isRowSelected;
        
        vm.rows = [];
        vm.items = [];
        vm.itemsPerPage = 5;
        vm.currentPage = 0;

        function onInit() {
            console.log('CTRL-onInit: $scope.vm.fields = %s', $scope.vm.fields)
            console.log('CTRL-onInit: $scope.vm.data = %s', $scope.vm.data)
            console.log('CTRL-onInit: $scope.vm.template = %s', $scope.vm.template)
            console.log('CTRL-onInit: $scope.vm.onSelectRow = %s', $scope.vm.onSelectRow)
        }

        function prevPage() {
            if (vm.currentPage > 0) {
                vm.currentPage--;
            }
        }

        function nextPage() {
            if (vm.currentPage < vm.pageCount()) {
                vm.currentPage++;
            }
        }

        function prevPageDisabled() {
            return vm.currentPage === 0 ? 'disabled' : null;
        }

        function nextPageDisabled() {
            return vm.currentPage === vm.pageCount() ? 'disabled' : null;
        }

        function pageCount() {
            return Math.ceil(vm.data.length/vm.itemsPerPage)-1;
        }

        function setPage(n) {
            vm.currentPage = n;
        }

        function range() {
            var rangeSize = 5;
            var ret = [];
            var start;

            start = vm.currentPage;

            if (start > vm.pageCount() - rangeSize) {
                start = vm.pageCount() - rangeSize + 1;
            }

            for (var i=start; i<start + rangeSize; i++) {
                ret.push(i);
            }

            return ret;
        }

        function selectRow(item) {
            !isRowSelected(item.id) ? vm.rows.push(item.id) : removeRow(item.id)
            vm.onSelectRow({ item: item });
        }

        function isRowSelected(id) {
            return vm.rows.includes(id);
        }

        function removeRow(id) {
            var index = vm.rows.map(function(item) {
                return item;
            }).indexOf(id);

            vm.rows.splice(index, 1);
        }

        $scope.$watch('vm.data', function() {
            vm.items = vm.data;
            vm.range = range();
        });

        $scope.$watch('vm.currentPage', function() {
            var begin = parseInt(vm.currentPage*vm.itemsPerPage);
            var end = begin + vm.itemsPerPage;

            vm.items = vm.data.slice(begin, end)
            vm.range = range();
        });
    }
})();