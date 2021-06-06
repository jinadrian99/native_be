const { 
    createData,
    getAll, 
    getDataByID,
    updateData,
    deleteData,

    getDataByIDDV,
} = require('./imageService.service');

module.exports = {
    createImageService: (req, res) => {
        const data = req.body;
        createData(data, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getImageServices: (req, res) => {
        getAll((err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getImageServiceByID: (req, res) => {
        const id = req.params.id;
        getDataByID(id, (err, results) => {
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
    updateImageService: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        updateData(id, data, (err, results) => {
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
    deleteImageService: (req, res) => {
        const id = req.params.id;
        deleteData(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            if(results == 0) {
                return res.status(404).json('Record not found');
            }
            return res.status(200).json('Deleted successfully');
        });
    },

    getImageServiceByIDDV: (req, res) => {
        const idDV = req.params.id;
        getDataByIDDV(idDV, (err, result) => {
            if(err) {                
                console.log(err);
                return res.status(500).json(err);
            }
            if(result == null) {
                return res.status(404).json('Record not found');
            }
            return res.status(200).json(result);
        })
    }
}