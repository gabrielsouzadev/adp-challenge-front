(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('GithubService', GithubService);

    GithubService.$inject = ['$http', 'API_URL', 'Logger'];

    function GithubService($http, API_URL, Logger) {
        return {
            getRepositories: getRepositories,
            getSubscribers: getSubscribers
        };

        function getRepositories() {
            return $http.get(API_URL + '/repositories', { cache: true })
                .then(getRepositoriesComplete)
                .catch(getRepositoriesFailed);

            function getRepositoriesComplete(response) {
                return response.data;
            }

            function getRepositoriesFailed(error) {
                Logger.error('XHR Failed for getRepositories.' + error.data);
            }
        }

        function getSubscribers(name) {
            return $http.get(API_URL + '/repos/' + name + '/subscribers', { cache: true })
                .then(getSubscribersComplete)
                .catch(getSubscribersFailed);
            
                function getSubscribersComplete(response) {
                    return response.data;
                }

                function getSubscribersFailed(error) {
                    Logger.error('XHR Failed for getSubscribers.' + error.data)
                }
        }
    }
})();