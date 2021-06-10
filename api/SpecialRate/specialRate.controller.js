var specialRate = require('./specialRate.service');
const Validator = require('fastest-validator');

const valid = new Validator();
const schema = {
    giaTheoThu: {
        type: 'number', min: 600,
        messages: {
            required: "Phải nhập giá!",
            number: "Giá phải là số!",
            numberMin: "Giá Phải lớn hơn bằng 30$!"
        }
    }
}
const check = valid.compile(schema);

module.exports = {
    index: (req, res) => {
        specialRate.getAll((err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        })
    },
    show: (req, res) => {
        id = req.params.id;
        specialRate.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result.length <= 0) { return res.status(400).json('Record not exists!'); }
            return res.status(200).json(result);
        })
    },
    store: (req, res) => {
        const data = req.body;

        var constraint = check(data);
        if(constraint !== true) return res.status(400).json(constraint);

        specialRate.getDataByThuNIDGTN(data.thu, data.idGTN,(err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result.length > 0) { return res.status(400).json('This Rate for Special Rate is Exists!'); }

            specialRate.createData(data, (err, result) => {
                if(err) { return res.status(500).json(err); }
                return res.status(200).json(result);
            });
        })
    },
    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;

        var constraint = check(data);
        if(constraint !== true) return res.status(400).json(constraint);
        
        specialRate.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result.length <= 0) { return res.status(400).json('Record not exists to update!'); }
            specialRate.getDataByThuNIDGTNPreventIdGTT(data.thu, data.idGTN, id, (err, result) => {
                if(err) { return res.status(500).json(err); }
                if(result.length > 0) { return res.status(400).json('This Rate for Special Rate is Exists!'); }

                specialRate.updateData(id, data, (err, result) => {
                    if(err) { return res.status(500).json(err); }
                    return res.status(200).json("Updated successfully");
                })       
            })     
        })
      
    },
    destroy: (req, res) => {
        const id = req.params.id;
        specialRate.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result.length <= 0) { return res.status(400).json('Record not exists to delete!'); }
            specialRate.deleteData(id, (err, result) => {
                if(err) { return res.status(500).json(err); }
                return res.status(200).json("Delete successfully");
            })            
        })
        
    }
}