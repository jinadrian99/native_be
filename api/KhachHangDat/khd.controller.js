const khd = require('./khd.service');

// var user = require('../User/user.service');

module.exports = {
    createKHD: (req, res) => {
        const data = req.body;
        khd.createData(data, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getKHD: (req, res) => {
        khd.getAll((err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getKHDByID: (req, res) => {
        const id = req.params.id;
        khd.getDataByID(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            if(results == null) {
                return res.status(404).json('Record not found');
            }
            return res.status(200).json(results);
        });
    },
    updateKHD: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        khd.updateData(id, data, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            if(results == null) {
                return res.status(404).json('Record not found');
            }
            return res.status(200).json('Updated successfully');
        });
    },
    // deleteKHD: (req, res) => {
    //     const data = req.body;
    //     user.getDataByIdKHD(data.idKHD, (err, results)=>{
    //         if(err){
    //             return res.status(500).json(err);
    //         }
    //         if(results == null) {
    //             return res.status(404).json('Record not found');
    //         }
    //         if(results.length > 0)
    //             return res.status(400).json({err: 'Exists KHD!'});
    //         else {
    //             deleteData(id, (err, results) => {
    //                 if(err) {
    //                     console.log(err);
    //                     return res.status(500).json(err);
    //                 }
    //                 if(results == 0) {
    //                     return res.status(404).json('Record not found');
    //                 }
    //                 return res.status(200).json('Deleted successfully');
    //             });
    //         }
    //     });
    // }
}