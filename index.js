const runPinger = require('./src/pinger/index');
const schedule = require('node-schedule');

const job = schedule.scheduleJob('Pinger', '*/15 * * * *', (time) => {
  console.log(`Ran jobs at ${time}`)
  runPinger()  
});

console.log('Started', job.name)
