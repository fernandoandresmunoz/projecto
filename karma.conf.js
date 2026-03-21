// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter')
    ],
    client: {
      jasmine: {
        // configuraciones de jasmine
      },
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/projecto'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml', 'junit'],
    junitReporter: {
      outputDir: 'junit-report', // Directorio donde se guardará
      // outputDir: 'reports/junit', // Directorio donde se guardará
      outputFile: 'test-results.xml', // Nombre del archivo
      useBrowserName: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    // --- CAMBIOS PARA DOCKER / CI ---
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage'
        ]
      }
    },
    // --------------------------------

    singleRun: false,
    restartOnFileChange: true
  });
};
// module.exports = function (config) {
//   config.set({
//     basePath: '',
//     frameworks: ['jasmine', '@angular-devkit/build-angular'],
//     plugins: [
//       require('karma-jasmine'),
//       require('karma-chrome-launcher'),
//       require('karma-jasmine-html-reporter'),
//       require('karma-coverage'),
//       require('@angular-devkit/build-angular/plugins/karma')
//     ],
//     client: {
//       jasmine: {
//         // you can add configuration options for Jasmine here
//         // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
//         // for example, you can disable the random execution with `random: false`
//         // or set a specific seed with `seed: 4321`
//       },
//       clearContext: false // leave Jasmine Spec Runner output visible in browser
//     },
//     jasmineHtmlReporter: {
//       suppressAll: true // removes the duplicated traces
//     },
//     coverageReporter: {
//       dir: require('path').join(__dirname, './coverage/projecto'),
//       subdir: '.',
//       reporters: [
//         { type: 'html' },
//         { type: 'text-summary' }
//       ]
//     },
//     reporters: ['progress', 'kjhtml'],
//     port: 9876,
//     colors: true,
//     logLevel: config.LOG_INFO,
//     autoWatch: true,
//     browsers: ['Chrome'],
//     singleRun: false,
//     restartOnFileChange: true
//   });
// };
