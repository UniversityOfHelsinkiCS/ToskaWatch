import { scheduleJob } from 'node-schedule'
import { runPinger } from './src/pinger'

const job = scheduleJob('Pinger', '*/10 * * * *', time => {
  console.log(`Ran pinger at ${time}`)
  runPinger()
})

console.log('Started', job.name)
