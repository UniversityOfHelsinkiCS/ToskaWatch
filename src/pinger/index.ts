import cypress from 'cypress'
import axios from 'axios'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const SLACK_AT_FAILURE_COUNT = 2

const status = new (class Statuses {
  failCounts: { [specName: string]: number | undefined } = {}
  firstFails: { [specName: string]: Date | undefined } = {}

  markFailure(specName: string) {
    const failCount = this.failCounts[specName] || 0
    if (failCount === 0) {
      this.firstFails[specName] = new Date()
    }
    this.failCounts[specName] = failCount + 1
  }

  markSuccess(specName: string) {
    this.failCounts[specName] = 0
    this.firstFails[specName] = undefined
  }

  getStatus(specName: string) {
    return {
      failCount: this.failCounts[specName],
      firstFail: this.firstFails[specName]
    }
  }

  getFailingTests() {
    return Object.entries(this.failCounts)
      .filter(([specName, failCount]) => failCount && failCount > 0)
      .map(([specName, failCount]) => {
        const firstFail = this.firstFails[specName]
        return {
          specName,
          failCount,
          firstFail
        }
      })
  }
})()

const postToSlack = async (data: { text?: string; blocks?: any } = { text: 'Toskawatch broke' }) => {
  if (!process.env.SLACK_HOOK) return

  try {
    await axios.post(process.env.SLACK_HOOK, data)
  } catch (err) {
    console.log('Failed to send to slack:', err.message)
  }
}

const postToMobvitaSlack = async (data: { text?: string; blocks?: any } = { text: 'Toskawatch broke' }) => {
  if (!process.env.MOBVITA_HOOK) return

  try {
    await axios.post(process.env.MOBVITA_HOOK, data)
  } catch (err) {
    console.log('Failed to send to slack (mobvita_notifications):', err.message)
  }
}

const handleTestFailure = (testIdentifier: string) => {
  status.markFailure(testIdentifier)
  const { failCount, firstFail } = status.getStatus(testIdentifier)

  console.log(`FAIL ${testIdentifier} with ${failCount} failures, first failed on ${firstFail?.toISOString()}`)
  if (failCount == SLACK_AT_FAILURE_COUNT) {

    if (testIdentifier === "mobvita/production.js") {
      postToMobvitaSlack({
        text: `Noot noot! Toskawatch has failed twice in row for ${testIdentifier} :penguin: This test failed for the first time on ${firstFail?.toISOString()}`
      })
    }

    postToSlack({
      text: `Noot noot! Toskawatch has failed twice in row for ${testIdentifier} :penguin: This test failed for the first time on ${firstFail?.toISOString()}`
    })
  }
}

const handleTestSuccess = (testIdentifier: string) => {
  const { failCount, firstFail } = status.getStatus(testIdentifier)
  // get old status before resetting it via marking success
  status.markSuccess(testIdentifier)

  if (!failCount) {
    console.log(`SUCCESS ${testIdentifier} with no previous fails`)
    return
  }

  console.log(`SUCCESS ${testIdentifier} after ${failCount} fails, first failed on ${firstFail?.toISOString()}`)
  if (failCount >= SLACK_AT_FAILURE_COUNT) {

    if (testIdentifier === "mobvita/production.js") {
      postToMobvitaSlack({
        text: `Doot doot! ${testIdentifier} works again! :penguin: This test began failing on ${firstFail?.toISOString()}`
      })
    }

    postToSlack({
      text: `Doot doot! ${testIdentifier} works again! :penguin: This test began failing on ${firstFail?.toISOString()}`
    })
  }
}

const runTests = async (spec: string) => {
  const testStatus = await cypress.run({
    project: __dirname,
    spec
  })

  testStatus.runs.forEach(run => {
    if (run.stats.failures) {
      handleTestFailure(run.spec.name)
    } else {
      handleTestSuccess(run.spec.name)
    }
  })
}

export const runReminderChecks = async () => {
  const failing = status.getFailingTests()
  if (failing.length === 0) {
    return
  }

  const specSections = failing.reduce<any[]>((arr, { specName, firstFail }) => {
    arr.push({
      type: 'section',
      fields: [
        {
          type: 'plain_text',
          text: specName
        },
        {
          type: 'mrkdwn',
          text: firstFail ? `${formatDistanceToNow(firstFail, { addSuffix: true })}` : 'Unknown :kuumotus:'
        },
        {
          type: 'plain_text',
          text: ' '
        },
        {
          type: 'mrkdwn',
          text: firstFail ? firstFail.toISOString() : ' '
        }
      ]
    })
    return arr
  }, [])

  const slackData = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Noot noot!* ${
            failing.length === 1 ? 'This Toskawatch check is' : 'These Toskawatch checks are'
            } still failing!`
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: '*Spec*'
          },
          {
            type: 'mrkdwn',
            text: '*Started failing*'
          }
        ]
      },
      ...specSections,
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: '_Enjoy your lunch!_'
          }
        ]
      }
    ]
  }

  postToSlack(slackData)
}

const asyncWait = (time: number) => new Promise(resolve => setTimeout(() => resolve(), time))

export const runPinger = async () => {
  try {
    // await runTests(`${__dirname}/cypress/integration/grappa/production.js`)
    // await asyncWait(10000)
    // await runTests(`${__dirname}/cypress/integration/grappa/staging.js`)
    // await asyncWait(10000)
    // await runTests(`${__dirname}/cypress/integration/oodikone/production.js`)
    // await asyncWait(10000)
    // await runTests(`${__dirname}/cypress/integration/oodikone/staging.js`)
    // await asyncWait(10000)
    await runTests(`${__dirname}/cypress/integration/mobvita/production.js`)
    // await asyncWait(10000)
    // await runTests(`${__dirname}/cypress/integration/pajat/production.js`)
  } catch (e) {
    console.log('Failed to run tests', e)
    process.exit(1)
  }
}
