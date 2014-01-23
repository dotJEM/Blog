/**
 * Created by jmd on 23-01-14.
 */
module.exports = function (config) {
    config.set({
        //browsers: ['PhantomJS'],
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        logLevel: config.LOG_INFO,
        loggers: [{ type: 'console' }],
        reporters: ['progress'],
        autoWatch: true,
        port: 9100,
        files: [
            'src/lib/jQuery/impl/jQuery-2.0.3.js',
            'src/lib/angular/impl/angular.js',
            'src/lib/angular/impl/angular-mocks.js',
            'src/lib/angular/impl/angular-resource.js',
            'src/lib/angular/impl/angular-animate.js',
            'src/lib/angular-routing/impl/angular-routing.js'

            //TODO: Source Files and Test Files
        ]
    });
};