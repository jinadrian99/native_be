var dailyRate = require('./dailyRate.service');

module.exports = {
    index: (req, res) => {
        dailyRate.getAll((err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        })
    },
    show: (req, res) => {
        id = req.params.id;
        dailyRate.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result.length <= 0) { return res.status(400).json('Record not exists!'); }
            return res.status(200).json(result);
        })
    },
    store: (req, res) => {
        const data = req.body;
        dailyRate.createData(data, (err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        });
    },
    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        dailyRate.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result.length <= 0) { return res.status(400).json('Record not exists to update!'); }
            dailyRate.updateData(id, data, (err, result) => {
                if(err) { return res.status(500).json(err); }
                return res.status(200).json("Updated successfully");
            })            
        })
    },
    destroy: (req, res) => {
        const id = req.params.id;

        dailyRate.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result.length <= 0) { return res.status(400).json('Record not exists to delete!'); }
            dailyRate.deleteData(id, (err, result) => {
                if(err) { return res.status(500).json(err); }
                return res.status(200).json("Delete successfully");
            })            
        })
        
    }
};