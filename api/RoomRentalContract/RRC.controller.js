var RRC = require('./RRC.service');

module.exports = {
    index: (req, res) => {
        RRC.getAll((err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        })
    },
    show: (req, res) => {
        const id = req.params.id;
        RRC.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        })
    },
    store: (req, res) => {
        var data = req.body;
        RRC.createData(data, (err, results) => {
            if(err) { return res.status(500).json(err); }
            if(results == null) { return res.status(400).json("Create failed!"); }
            res.status(200).json(results);
        })
    },
    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        RRC.updateData(id, data, (err, result)=>{
            if(err) { return res.status(500).json(err); }
            return res.status(200).json('Update successfully');
        })
    },
}