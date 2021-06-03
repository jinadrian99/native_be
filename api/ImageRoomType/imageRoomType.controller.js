const { 
    createData,
    getAll, 
    getDataByID,
    updateData,
    deleteData,

    getDataByIDLP,
} = require('./imageRoomType.service');

module.exports = {
    createImageRoomType: (req, res) => {
        const data = req.body;
        createData(data, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getImageRoomTypes: (req, res) => {
        getAll((err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getImageRoomTypeByID: (req, res) => {
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
    updateImageRoomType: (req, res) => {
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
    deleteImageRoomType: (req, res) => {
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

    getImageRoomTypeByIDLP: (req, res) => {
        const idLP = req.params.id;
        getDataByIDLP(idLP, (err, result) => {
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