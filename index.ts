if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
import { scheduleJob } from 'node-schedule'
import { runPinger, runReminderChecks } from './src/pinger'

const pingerJob = scheduleJob('Pinger', '*/15 * * * *', time => {
  console.log(`Ran pinger at ${time}`)
  runPinger()
})

const reminderJob = scheduleJob('Reminder', '55 10 * * *', time => {
  console.log(`Ran reminder job at ${time}`)
  runReminderChecks()
})

console.log('Started jobs: ', [pingerJob, reminderJob].map(j => j.name).join(', '))
