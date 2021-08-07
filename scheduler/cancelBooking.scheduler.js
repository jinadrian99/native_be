const scheduler = require('../Helper/scheduler.helper');
const crontab = "30 14 * * *";
// const crontab = "*/10 * * * * *";

var bookingController = require('../api/Booking/booking.service');

scheduler.scheduleJob(crontab, () => {
    var cancelBooking = 1; 
    var statusProgress = 0;

    var duration = 2;
    var someDateAgo = new Date(new Date().getTime() - (duration * 24 * 60 * 60 * 1000));
    someDateAgo = someDateAgo.getFullYear() + "-" + (someDateAgo.getMonth() + 1) + "-" + someDateAgo.getDate();
    console.log(someDateAgo);

    bookingController.schedulerChangeStatusByDateArriveAndStatus(cancelBooking, statusProgress, someDateAgo, (err, affected) => {
        if(err) { return console.log(err); }
        if(affected)
            return console.log("Was update booking status don't use");
        else
            return console.log("No overdue bookings with status progress");
    })
})

