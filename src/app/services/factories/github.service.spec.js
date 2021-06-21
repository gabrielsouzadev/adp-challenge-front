'use stict';

(function() {
    describe('Github Factory', function() {
        var GithubService, $httpBackend, $q;
        var API_URL = 'https://api.github.com';
        var RESPONSE = {
            list: [
                {
                    id: 1,
                    node_id: "MDEwOlJlcG9zaXRvcnkx",
                    name: "grit",
                    full_name: "mojombo/grit",
                    private: false,
                    owner: {
                        login: "mojombo",
                        id: 1,
                        node_id: "MDQ6VXNlcjE=",
                        avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
                        gravatar_id: "",
                        url: "https://api.github.com/users/mojombo",
                        html_url: "https://github.com/mojombo",
                        followers_url: "https://api.github.com/users/mojombo/followers",
                        following_url: "https://api.github.com/users/mojombo/following{/other_user}",
                        gists_url: "https://api.github.com/users/mojombo/gists{/gist_id}",
                        starred_url: "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
                        subscriptions_url: "https://api.github.com/users/mojombo/subscriptions",
                        organizations_url: "https://api.github.com/users/mojombo/orgs",
                        repos_url: "https://api.github.com/users/mojombo/repos",
                        events_url: "https://api.github.com/users/mojombo/events{/privacy}",
                        received_events_url: "https://api.github.com/users/mojombo/received_events",
                        type: "User",
                        site_admin: false
                    },
                }
            ],
            subscribers: [
                {
                    login: "dalehenrich",
                    id: 623951,
                    node_id: "MDQ6VXNlcjYyMzk1MQ==",
                    avatar_url: "https://avatars.githubusercontent.com/u/623951?v=4",
                    gravatar_id: "",
                    url: "https://api.github.com/users/dalehenrich",
                    html_url: "https://github.com/dalehenrich",
                    followers_url: "https://api.github.com/users/dalehenrich/followers",
                    following_url: "https://api.github.com/users/dalehenrich/following{/other_user}",
                    gists_url: "https://api.github.com/users/dalehenrich/gists{/gist_id}",
                    starred_url: "https://api.github.com/users/dalehenrich/starred{/owner}{/repo}",
                    subscriptions_url: "https://api.github.com/users/dalehenrich/subscriptions",
                    organizations_url: "https://api.github.com/users/dalehenrich/orgs",
                    repos_url: "https://api.github.com/users/dalehenrich/repos",
                    events_url: "https://api.github.com/users/dalehenrich/events{/privacy}",
                    received_events_url: "https://api.github.com/users/dalehenrich/received_events",
                    type: "User",
                    site_admin: false
                },
                {
                    login: "dougborg",
                    id: 1261222,
                    node_id: "MDQ6VXNlcjEyNjEyMjI=",
                    avatar_url: "https://avatars.githubusercontent.com/u/1261222?v=4",
                    gravatar_id: "",
                    url: "https://api.github.com/users/dougborg",
                    html_url: "https://github.com/dougborg",
                    followers_url: "https://api.github.com/users/dougborg/followers",
                    following_url: "https://api.github.com/users/dougborg/following{/other_user}",
                    gists_url: "https://api.github.com/users/dougborg/gists{/gist_id}",
                    starred_url: "https://api.github.com/users/dougborg/starred{/owner}{/repo}",
                    subscriptions_url: "https://api.github.com/users/dougborg/subscriptions",
                    organizations_url: "https://api.github.com/users/dougborg/orgs",
                    repos_url: "https://api.github.com/users/dougborg/repos",
                    events_url: "https://api.github.com/users/dougborg/events{/privacy}",
                    received_events_url: "https://api.github.com/users/dougborg/received_events",
                    type: "User",
                    site_admin: false
                }
            ],
            error: {
                message: "Not Found",
                documentation_url: "https://docs.github.com/rest/reference/repos#get-a-repository"
            }
        };

        beforeEach(function() {
            angular
                .mock
                .module('app.core')
        });

        beforeEach(inject(function() {
            var $injector = angular.injector(['app.core', 'ngMock']);
            GithubService = $injector.get('GithubService');
            $httpBackend = $injector.get('$httpBackend');
            $q = $injector.get('$q');
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should be defined', function() {
            expect(GithubService).toBeDefined();
        });

        describe('.getRepositories', function() {
            var result = {};

            beforeEach(function() {
                result = {};
                spyOn(GithubService, 'getRepositories').and.callThrough();
            })

            it('should be defined', function() {
                expect(GithubService.getRepositories).toBeDefined();
            });

            it('should return a list of repositories', function() {
                $httpBackend.whenGET(API_URL + '/repositories').respond(200, $q.when(RESPONSE.list));

                expect(GithubService.getRepositories).not.toHaveBeenCalled();
                expect(result).toEqual({});

                GithubService.getRepositories()
                    .then(function(res) {
                        result = res;
                    });

                $httpBackend.flush();
                
                expect(result.length).toEqual(RESPONSE.list.length);
                expect(result[0].node_id).toEqual('MDEwOlJlcG9zaXRvcnkx');
            }); 
        });

        describe('.getSubscribers(name)', function() {
            var result = {};

            beforeEach(function() {
                result = {};
                spyOn(GithubService, 'getSubscribers').and.callThrough();
            })

            it('should be defined', function() {
                expect(GithubService.getSubscribers).toBeDefined();
            });

            it('should return one list of subscribers if exists', function() {
                var repo = 'semver/semver';

                $httpBackend.whenGET(API_URL + '/repos/' + repo + '/subscribers').respond(200, $q.when(RESPONSE.subscribers));

                expect(GithubService.getSubscribers).not.toHaveBeenCalled();
                expect(result).toEqual({});

                GithubService.getSubscribers(repo)
                    .then(function(res) {
                        result = res;
                    });

                $httpBackend.flush();

                expect(GithubService.getSubscribers).toHaveBeenCalledWith(repo);
                expect(result.length).toEqual(RESPONSE.subscribers.length);
                expect(result[0].id).toEqual(RESPONSE.subscribers[0].id);
                expect(result[1].id).toEqual(RESPONSE.subscribers[1].id);
            });

            it('should return error if subscribers repo not exists', function() {
                var repo = 'djaowj';

                $httpBackend.whenGET(API_URL + '/repos/' + repo + '/subscribers').respond(200, $q.when(RESPONSE.error));

                expect(GithubService.getSubscribers).not.toHaveBeenCalled();
                expect(result).toEqual({});

                GithubService.getSubscribers(repo)
                    .then(function(res) {
                        result = res;
                    });

                $httpBackend.flush();

                expect(GithubService.getSubscribers).toHaveBeenCalledWith(repo);
                expect(result).toEqual(RESPONSE.error);
            });
        });
    });
})();