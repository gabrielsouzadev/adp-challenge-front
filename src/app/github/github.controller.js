(function() {
    'use strict';

    angular
        .module('app.github')
        .controller('GithubCtrl', GithubCtrl);

    GithubCtrl.$inject = ['$scope', 'GithubService', 'Logger', 'GithubPrepService'];

    function GithubCtrl($scope, GithubService, Logger, GithubPrepService) {
        var vm = this;

        vm.onAddRepository = onAddRepository;
        vm.addSubscribers = addSubscribers;
        
        vm.repositories = GithubPrepService;
        vm.subscribers = [];
        vm.totalSubscribers = 0;

        vm.fields = [
            {
                name: 'ID', 
            },
            {
                name: 'Avatar',
            },
            {
                name: 'Nome',
            },
            {
                name: 'Perfil',
            }
        ];

        function getSubscribers(name, id) {
            return GithubService.getSubscribers(name)
                .then(function(data) {
                    addSubscribers(id, data.length);
                });
        }
            
        function onAddRepository(item) {
            if (!checkSubscribers(item.id)) {
                var name = item.full_name
                getSubscribers(name, item.id).then(function() {
                    Logger.log('Subscribers added');
                });
            } else {
                removeSubscribers(item.id);
            }
        }
            
        function addSubscribers(id, subscribers_qt) {
            vm.subscribers.push({ id:id, subs_qt: parseInt(subscribers_qt) });
        }

        function removeSubscribers(id) {
            var index = vm.subscribers.map(function(item) {
                return item.id;
            }).indexOf(id);

            vm.subscribers.splice(index, 1);
        }

        function checkSubscribers(id) {
            return vm.subscribers.some(function(item){ return item.id == id });
        }

        $scope.$watchCollection('vm.subscribers', function() {
            var subs_qtd = 0;
            vm.subscribers.map(function(item) {
                subs_qtd += item.subs_qt;
            });

            vm.totalSubscribers = subs_qtd;
        });
    }   
})();