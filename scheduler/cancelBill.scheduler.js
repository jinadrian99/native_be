const scheduler = require('../Helper/scheduler.helper');
const crontab = "30 14 * * *";
// const crontab = "*/10 * * * * *";

var billController = require('../api/Bill/Bill.service');

scheduler.scheduleJob(crontab, () => {
    var cancelBill = 4;
    var cancelBooking = 1; 
    var statusUnpaid = 1;
    var statusDeposit = 2;

    var duration = 3; // sau 3 ngay cua ngay den
    var someDateAgo = new Date(new Date().getTime() - (duration * 24 * 60 * 60 * 1000));
    someDateAgo = someDateAgo.getFullYear() + "-" + (someDateAgo.getMonth() + 1) + "-" + someDateAgo.getDate();
    console.log(someDateAgo);

    billController.schedulerChangeStatusForUnPaidByDateArriveAndStatus(cancelBill, cancelBooking, statusUnpaid, someDateAgo, (err, affected) => {
        if(err) { return console.log(err); }
        if(affected)
            return console.log("Was update bill status don't use");
        else
            return console.log("No overdue bill with status progress");
    })
    billController.schedulerChangeStatusForDepositNonRRCByDateArriveAndStatus(cancelBill, cancelBooking, statusDeposit, someDateAgo, (err, affected) => {
        if(err) { return console.log(err); }
        if(affected)
            return console.log("Was update bill status don't use");
        else
            return console.log("No overdue bill with status progress");
    })
})

