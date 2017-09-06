// conf.js
var HtmlScreenshotReporter = require('/usr/local/lib/node_modules/protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: '/Users/phantom/Sites/DTNA/screenshots',
  filename: 'my-report.html'
});

exports.config = {
  plugins: [{
    package: 'protractor-console',
    logLevels: ['debug', 'warning', 'info', 'severe']
  }],
  allScriptsTimeout: 120000,
  getPageTimeout: 120000,
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
  	browserName: 'chrome',
    chromeOptions: {
            args: ['--no-sandbox', '--disable-infobars'],
            //Download path for every download made by tests
            prefs: {
              'download': {
                'prompt_for_download': false,
                'default_directory': '/Users/phantom/Sites/DTNA/testdownloads'
              },
                'credentials_enable_service': false,
                'profile': {
                    'password_manager_enabled': false
                }
            }
        },
    shardTestFiles: false,
    maxInstances: 1
  	},
  specs: ['v2signUp-spec.js',],
  jasmineNodeOpts: {
  	defaultTimeoutInterval: 120000,
  	showColors: true,
  	print: function() {}
  	},
     // Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },
  onPrepare: function() {
      var SpecReporter = require('/usr/local/lib/node_modules/jasmine-spec-reporter');
      var helpers = require('/usr/local/lib/node_modules/protractor-helpers');
      jasmine.getEnv().addReporter(reporter);
      jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
      var jasmineReporters = require('/usr/local/lib/node_modules/jasmine-reporters');
    	jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: '/Users/phantom/Sites/DTNA/testresults',
        filePrefix: 'xmloutput',
    	}));
	}  
}


