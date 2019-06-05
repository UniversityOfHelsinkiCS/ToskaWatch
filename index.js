const runPinger = require('./src/pinger/index');
const schedule = require('node-schedule');

const job = schedule.scheduleJob('Pinger', '*/10 * * * *', (time) => {
  console.log(`Ran pinger at ${time}`)
  runPinger()  
});

console.log('Started', job.name)
