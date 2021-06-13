var room = require('./room.service');
var roomType = require('../RoomType/roomType.service');
const Validator = require('fastest-validator');

const valid = new Validator();
const schema = {
    maPhong: {
        type: 'string', min: 3, max: 10
        // messages: {
        //     required: "Phải nhập giá!",
        //     number: "Giá phải là số!",
        //     numberMin: "Giá Phải lớn hơn bằng 600$!"
        // }
    }
}
const check = valid.compile(schema);

module.exports = {
    index: (req, res) => {
        room.getAll((err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        })
    },
    show: (req, res) => {
        id = req.params.id;
        room.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json('Record not exists!'); }
            return res.status(200).json(result);
        })
    },
    store: (req, res) => {
        const data = req.body;

        var constraint = check(data);
        if(constraint !== true) return res.status(400).json(constraint);

        if(data.maPhong.indexOf(" ") >= 0 || data.maPhong.indexOf("?") >= 0){ return res.status(400).json(`id room can't " " or "?"`)}

        room.getDataByID(data.maPhong, (err, result) => {
            if(err) { return res.status(500).json(err);}
            if(result != null) { return res.status(400).json('This id room is Exists!')}
            room.createData(data, (err, result) => {
                if(err) { return res.status(500).json(err); }
                roomType.updateSoLuong(data.idLP, true, (err, result) => {
                    if(err) { return res.status(500).json(err);}
                    return res.status(200).json("Created successfully");
                })
            });
        });
    },
    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;

        var constraint = check(data);
        if(constraint !== true) return res.status(400).json(constraint);
        
        room.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json(`This room doesn't exists to update!`); }
            roomType.updateSoLuong(result.idLP, false, (err, result) => {
                if(err) { return res.status(500).json(err);}
                room.updateData(id, data, (err, result) => {
                    if(err) { return res.status(500).json(err); }
                    roomType.updateSoLuong(data.idLP, true, (err, result) => {
                        if(err) { return res.status(500).json(err); }
                        return res.status(200).json("Updated successfully");
                    })
                }) 
            })
        })
    },
    destroy: (req, res) => {
        const id = req.params.id;
        room.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json('Record not exists to delete!'); }
            roomType.updateSoLuong(result.idLP, false, (err, result) => {
                if(err) { return res.status(500).json(err);}
                room.deleteData(id, (err, result) => {
                    if(err) { return res.status(500).json(err); }
                    return res.status(200).json("Delete successfully");
                })
            })            
        })
    },
};