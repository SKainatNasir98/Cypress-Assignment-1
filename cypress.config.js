
const { defineConfig } = require('cypress')
module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 120000,
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