
const { defineConfig } = require('cypress')
module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 120000,
    videoCompression: true,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome-reports',
      overwrite: true,
      html: false,
      json: true,
      reportFilename: '[name]' 
    },
    setupNodeEvents(on, config) {
      on('task', {downloadFile})
   },
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'chromium') {
          launchOptions.args.push('--incognito')
        }
        if (browser.name === 'firefox') {
          launchOptions.args.push('-private')
        }
        return launchOptions
      })
    },
    specPattern: 'cypress/e2e/**/*.cy.js',

  },

})