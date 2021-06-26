var customerStay = require('./CustomerStay.service');
var RRC = require('../RoomRentalContract/RRC.service');
const Validator = require('fastest-validator');

const valid = new Validator();
const schema = {
    tenKH: {
        type: 'string', min: 2,
        messages: {
            required: "Must input name!",
            string: "Name is string!",
            stringMin: "Name is over 2 characters!"
        }
    }
}
const check = valid.compile(schema);

module.exports = {
    index: (req, res) => {
        customerStay.getAll((err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        })
    },
    show: (req, res) => {
        id = req.params.id;
        customerStay.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json('Record not exists!'); }
            return res.status(200).json(result);
        })
    },
    store: (req, res) => {
        const data = req.body;

        var constraint = check(data);
        if(constraint !== true) return res.status(400).json(constraint);

        customerStay.createData(data, (err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json("Created successfully");
        });
    },
    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;

        var constraint = check(data);
        if(constraint !== true) return res.status(400).json(constraint);
        
        customerStay.updateData(id, data, (err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json("Updated successfully");
        })
    },
    destroy: (req, res) => {
        const id = req.params.id;
        customerStay.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json('Record not exists to delete!'); }
            RRC.getDataByIdKHO(id, (err, result) => {
                if(err) { return res.status(500).json(err); }
                if(result.length > 0) { return res.status(400).json("Can't delete this customer!"); }
                customerStay.deleteData(id, (err, result) => {
                    if(err) { return res.status(500).json(err); }
                    return res.status(200).json("Delete successfully");
                })   
            })
                     
        })
        
    }
}