var PayerS = require('./Payer.service');

module.exports = {
    index: (req, res) => {
        PayerS.getAll((err, results) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(results)
        })
    },
    show: (req, res) => {
        const id = req.params.id;
        PayerS.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Record not exists!")}
            return res.status(200).json(result)
        })
    },
    store: (req, res) => {
        var data = req.body;
        PayerS.getDataByID(data.idThe, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result != null) { return res.status(400).json("Record is exists!")}

            PayerS.createData(data, (err, result) => {
                if(err) { return res.status(500).json(err); }
                res.status(200).json(result);
            })
        })
    },
    update: (req, res) => {
        return res.status(200).json("Undefined func for method!");
    },
    destroy: (req, res) => {
        var id = req.params.id;
        PayerS.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Record not exists!")}

            PayerS.deleteData(id, (err, result) => {
                if(err) { return res.status(500).json(err); }
                return res.status(200).json("Deleted successfully")
            })
        })
    }
}