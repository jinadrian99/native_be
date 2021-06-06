const { 
    createData,
    getAll, 
    getDataByID,
    updateData,
    deleteData
} = require('./service.service');

var serviceImage = require('../ImageService/imageService.service');

module.exports = {
    createService: (req, res) => {
        const data = req.body;
        createData(data, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getServices: (req, res) => {
        getAll((err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getServiceID: (req, res) => {
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
    updateService: (req, res) => {
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
    deleteService: (req, res) => {
        const id = req.params.id;
        serviceImage.getDataByIDDV(id, (err, results)=>{
            if (err) {
                return res.status(500).json(err);
            }
            if (results == null) {
                return res.status(404).json('Record not found');
            }
            if(results.length > 0) {
                return res.status(400).json( 'Exists service image!');
            }
            else {
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
            }
        });
    }
}