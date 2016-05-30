// Karma configuration
<<<<<<< HEAD
// Generated on Fri May 27 2016 14:48:29 GMT-0700 (PDT)
=======
// Generated on Thu May 26 2016 16:52:45 GMT-0700 (PDT)
>>>>>>> c8a34e5b9acab62d78c23a5d3871c7bcef08dab7

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
<<<<<<< HEAD
    basePath: '',
=======
    basePath: 'test/bundle.js',
>>>>>>> c8a34e5b9acab62d78c23a5d3871c7bcef08dab7


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
<<<<<<< HEAD
    singleRun: false,
=======
    singleRun: true,
>>>>>>> c8a34e5b9acab62d78c23a5d3871c7bcef08dab7

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
<<<<<<< HEAD
  })
}
=======
  });
};
>>>>>>> c8a34e5b9acab62d78c23a5d3871c7bcef08dab7
