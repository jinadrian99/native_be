var SP = require('./surchargePrice.service');

module.exports = {
    index: (req, res) => {
        SP.getAll((err, results) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(results)
        })
    },
    show: (req, res) => {
        const id = req.params.id;
        SP.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Record not exists!")}
            return res.status(200).json(result)
        })
    },
    store: (req, res) => {
        var data = req.body;
        SP.createData(data, (err, results) => {
            if(err) { return res.status(500).json(err); }
            if(results == null) { return res.status(400).json("Create failed!"); }
            return res.status(200).json("Created successfully");
        })
    },
    update: (req, res) => {
        var id = req.params.id;
        var data = req.body;
        SP.updateData(id, data, (err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json("Updated successfully");
        })
    },
    destroy: (req, res) => {
        var id = req.params.id;
        SP.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Record not exists!")}

            SP.deleteData(id, (err, result) => {
                if(err) { return res.status(500).json(err); }
                return res.status(200).json("Deleted successfully")
            })
        })
    },
}