(function() {
    'use strict';

    angular
        .module('app.github')
        .run(appRun);

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'github',
                config: {
                    url: '/',
                    templateUrl: 'app/github/github.html',
                    controller: 'GithubCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        GithubPrepService: GithubPrepService,
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/github/github.controller.js'
                            ])
                        }]
                    }
                }
            }
        ];
    }

    function GithubPrepService(GithubService) {
        return GithubService.getRepositories();
    }
})();