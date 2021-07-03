var bill = require('./Bill.service');

module.exports = {
    getBillsByIDKHD: (req, res) => {
        const idKHD = req.params.idKHD;
        bill.getDataByIDKHD(idKHD, (err, bills) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(bills);
        }) 
    },
    changeStatusToDepositByIdPTT: (req, res) => {
        const idPTT = req.params.idPTT;
        bill.changeStatus(idPTT, 2, (err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json('change status to deposit');
        })
    },
    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        bill.updateData(id, data, (err, result)=>{
            if(err) { return res.status(500).json(err); }
            return res.status(200).json('Update successfully');
        })
    },
}