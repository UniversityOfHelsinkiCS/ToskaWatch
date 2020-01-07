import schedule from 'node-schedule'
import { runPinger } from './src/pinger'

const job = schedule.scheduleJob('Pinger', '*/10 * * * *', time => {
  console.log(`Ran pinger at ${time}`)
  runPinger()
})

console.log('Started', job.name)
