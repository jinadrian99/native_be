var DBS = require('./BillD.service');

module.exports = {
    index: (req, res) => {
        DBS.getAll((err, results) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(results)
        })
    },
    show: (req, res) => {
        const id = req.params.id;
        DBS.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Record not exists!")}
            return res.status(200).json(result)
        })
    },
    store: (req, res) => {
        var data = req.body;
        DBS.getDataByMaPhongNIDPTT(data.maPhong, data.idPTT, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result != null) { return res.status(400).json("Record is exists!")}

            DBS.createData(data, (err, results) => {
                if(err) { return res.status(500).json(err); }
                if(result == null) { return res.status(400).json("Create failed!"); }
                res.status(200).json("Created successfully");
            })
        })
    },
    update: (req, res) => {
        return res.status(200).json("Undefined func for method!");
    },
    destroy: (req, res) => {
        var id = req.params.id;
        DBS.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Record not exists!")}

            DBS.deleteData(id, (err, result) => {
                if(err) { return res.status(500).json(err); }
                return res.status(200).json("Deleted successfully")
            })
        })
    },
}