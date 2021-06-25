const schedule = require('node-schedule');

module.exports = {
    scheduleJob: (crontab, cb) => {
        schedule.scheduleJob(crontab, () => {
            return cb();   
        });
    }
}