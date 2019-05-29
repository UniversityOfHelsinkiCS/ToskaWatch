const cypress = require('cypress')
const axios = require('axios')

const postToSlack = async (text = 'Toskawatch broke') => {
  if (!process.env.SLACK_HOOK) return;

  try {
    await axios.post(process.env.SLACK_HOOK, { text })
  } catch (err) {
    console.log('Failed to send to slack:', err.message)
  }
}

const runTests = async (spec) => {
  const testStatus = await cypress.run({
    project: __dirname,
    spec
  })

  if (testStatus.totalFailed || !testStatus.totalTests) {
    testStatus.runs.forEach(run => {
      if (run.stats.failures) {
        postToSlack(`Noot noot! Toskawatch failed for ${run.spec.name}`)
      }
    })
  }
}

const runPinger = async () => {
  await runTests(`${__dirname}/cypress/integration/grappa/*`)
  await runTests(`${__dirname}/cypress/integration/oodikone/*`)
}

module.exports = runPinger;
