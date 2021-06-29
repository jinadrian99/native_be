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
            stringMin: "Name must be at least 2 characters!"
        }
    },
    CMND: {
        type: 'string', min: 9, max: 12,
        messages: {
            required: "Must input Identity card!",
            string: "Identity card is string!",
            stringMin: "Identity card must be at least 9 characters!",
            stringMax: "Identity card must be at most 12 characters!"
        }
    },
    Passport: {
        type: 'string', length: 8,
        messages: {
            required: "Must input Passport!",
            string: "Passport is string!",
            length: "Passport must be at 8 characters!"
        }
    },
    sdt: {
        type: 'string', length: 10,
        messages: {
            required: "Must input the phone number!",
            string: "Phone number is string!",
            length: "Phone number must be at 10 characters!"
        }
    },
    sdt: {
        type: 'string', length: 10,
        messages: {
            required: "Must input the phone number!",
            string: "Phone number is string!",
            length: "Phone number must be at 10 characters!"
        }
    },
    title: {
        type: 'string',
        messages: {
            required: "Must input the title!",
            string: "Title is string!",
        }
    },
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

        customerStay.getDataByCMND(data.CMND, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result != null){ return res.status(400).json("Exits this identity card!"); }
        });
        customerStay.getDataByPassport(data.Passport, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result != null){ return res.status(400).json("Exits this Passport!"); }
        });
        customerStay.getDataBySdt(data.sdt, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result != null){ return res.status(400).json("Exits this phone number!"); }
        });

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
        
        customerStay.getDataByCMND(data.CMND, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result != null) { 
                if(result.idKHO != id) {
                    return res.status(400).json("Exits this identity card!"); 
                }
            }
        });
        customerStay.getDataByPassport(data.Passport, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result != null) { 
                if(result.idKHO != id) {
                    return res.status(400).json("Exits this Passport!"); 
                }
            }
        });
        customerStay.getDataBySdt(data.sdt, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result != null) { 
                if(result.idKHO != id) {
                    return res.status(400).json("Exits this phone number!"); 
                }
            }
        });

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