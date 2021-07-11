var bill = require('./Bill.service');

module.exports = {
    getBillsByIDKHD: (req, res) => {
        const idKHD = req.params.idKHD;
        bill.getDataByIDKHD(idKHD, (err, bills) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(bills);
        }) 
    },
    getBillByIdDDP: (req, res) => {
        const idDDP = req.params.id;
        bill.getIdkhdByIdddp(idDDP, (err, bills) => {
            if(err) { return res.status(500).json(err); }
            console.log('bill by idDDP: ', bills)
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
    changeStatusToPaidByIdPTT: (req, res) => {
        const idPTT = req.params.idPTT;
        bill.changeStatus(idPTT, 3, (err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json('change status to deposit');
        })
    },
    index: (req, res) => {
        bill.getAll((err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        })
    },
    show: (req, res) => {
        const id = req.params.id;
        bill.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        })
    },
    store: (req, res) => {
        var data = req.body;
        bill.createData(data, (err, results) => {
            if(err) { return res.status(500).json(err); }
            if(results == null) { return res.status(400).json("Create failed!"); }
            res.status(200).json(results);
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