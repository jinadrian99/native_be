const { 
    createData,
    getAll, 
    getDataByID,
    updateData,
    deleteData
} = require('./roomType.service');

const roomTypeImage = require('../ImageRoomType/imageRoomType.service');

module.exports = {
    createRoomType: (req, res) => {
        const data = req.body;
        createData(data, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getRoomTypes: (req, res) => {
        getAll((err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getRoomTypeByID: (req, res) => {
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
    updateRoomType: (req, res) => {
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
    deleteRoomType: (req, res) => {
        const id = req.params.id;
        const constrain = [];
        roomTypeImage.getDataByIDLP(id, (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            if(results == null) {
                return res.status(404).json('Record not found');
            }
            constrain = results;
        })
        if(constrain.length > 0)
            return res.status(400).json('Exist Hình ảnh');
        else
            return res.status(200).json('Có thể xóa');
        // deleteData(id, (err, results) => {
        //     if(err) {
        //         console.log(err);
        //         return res.status(500).json(err);
        //     }
        //     if(results == 0) {
        //         return res.status(404).json('Record not found');
        //     }
        //     return res.status(200).json('Deleted successfully');
        // });
    }
}