// Karma configuration
// Generated on Sat Jun 19 2021 15:45:30 GMT-0300 (Horário Padrão de Brasília)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-resource/angular-resource.js',
      './node_modules/angular-cache/dist/angular-cache.js',
      './node_modules/@uirouter/angularjs/release/angular-ui-router.js',
      './node_modules/oclazyload/dist/ocLazyLoad.js',
      './node_modules/toastr/build/toastr.min.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './src/app/app.module.js',
      './src/app/core/core.module.js',
      './src/app/github/github.module.js',
      './src/app/layout/layout.module.js',
      './src/app/widgets/widges.module.js',
      './src/app/blocks/exception/exception.module.js',
      './src/app/blocks/router/router.module.js',
      './src/app/blocks/logger/logger.module.js',
      './src/app/core/config.js',
      './src/app/core/constants.js',
      './src/app/services/factories/github.service.js',
      './src/app/services/factories/github.service.spec.js',
      './src/app/github/github.routes.js',
      './src/app/github/github.routes.spec.js',
      './src/app/github/github.controller.js',
      './src/app/github/github.controller.spec.js',
      './src/app/widgets/table/table.directive.js',
      './src/app/widgets/table/table.directive.spec.js',
      './src/app/widgets/**/*.html',
      './src/app/blocks/router/router.helper.js',
      './src/app/blocks/router/router.helper.spec.js',
      './src/app/blocks/logger/logger.js',
      './src/app/blocks/logger/logger.spec.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      './src/**/*.js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['spec', 'coverage'],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity
  })
}
