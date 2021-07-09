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
                if(results == null) { return res.status(400).json("Create failed!"); }
                res.status(200).json("Created successfully");
            })
        })
    },
    update: (req, res) => {
        var id = req.params.id;
        var data = req.body;        
        DBS.getDataByMaPhongNIDPTTExceptID(data.maPhong, data.idPTT, id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result != null) { return res.status(400).json("Record is exists!")}

            DBS.updateData(id, data, (err, result) => {
                if(err) { return res.status(500).json(err); }
                return res.status(200).json("Updated successfully");
            })
        })

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
    getBillDetailsByIDPTT: (req, res) => {
        idPTT = req.params.idPTT;
        DBS.getDataByIDPTT(idPTT, (err, data) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(data);
        })
    }
}