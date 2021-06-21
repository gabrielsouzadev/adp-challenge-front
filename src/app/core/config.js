(function() {
    'use strict';

    angular
        .module('app.core')
        .config(cacheProviderConfig)
        .config(configure);

        /* @ngInject */
        function cacheProviderConfig(CacheFactoryProvider) {
            CacheFactoryProvider.defaults = {
                maxAge: 36000000,
                deleteOnExpire: 'aggressive',
                onExpire: function (key, value) {
                    var _this = this;
                    angular
                        .injector(['ng']).get('$http').get(key).success(function (data) {
                            _this.put(key, data);
                        });
                }
            };
        }

        /* @ngInject */
        function configure ($logProvider) {
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }
        }        
})();