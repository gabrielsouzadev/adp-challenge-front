'use strict';

(function() {
    describe('app.github', function() {
        var $controller, GithubService, $q, $httpBackend, $rootScope, scope, $provide;
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
            ]
        };

        beforeEach(angular.mock.module('ui.router'));
        beforeEach(angular.mock.module('app.github'));
        beforeEach(angular.mock.module('app.core'));

        beforeEach(inject(function(_$controller_, _GithubService_, _$q_, _$httpBackend_, _$rootScope_) {
            $controller = _$controller_;
            GithubService = _GithubService_;
            $q = _$q_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe('Github Controller', function() {
            var GithubCtrl;

            beforeEach(function() {
                scope = $rootScope.$new();
                GithubCtrl = $controller('GithubCtrl', { $scope: scope, GithubService: GithubService, GithubPrepService: RESPONSE.list  });

                spyOn(GithubService, 'getRepositories').and.callThrough();

                $httpBackend.whenGET(API_URL + '/repositories').respond(200, $q.when(RESPONSE.list));
                $httpBackend.flush();
            });

            it('should be defined', function() {
                expect(GithubCtrl).toBeDefined();
            });

            it('should return a list of repositories', function() {
                expect(GithubCtrl.repositories).toEqual(RESPONSE.list);
            });

            it('should add a subscriber', function() {
                var item = {
                    full_name: 'semver/semver',
                    id: 1
                };
                
                $httpBackend.whenGET(API_URL + '/repos/' + item.full_name + '/subscribers').respond(200, $q.when(RESPONSE.subscribers));

                GithubCtrl.onAddRepository(item)
                
                $httpBackend.flush();

                GithubCtrl.addSubscribers(GithubCtrl.subscribers[0].id, GithubCtrl.subscribers[0].subs_qt);

                expect(GithubCtrl.subscribers.length).toEqual(2);
            });
        });
    });
})();