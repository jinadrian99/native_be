const admin = require('./admin.service');

const Validator = require('fastest-validator');
const valid = new Validator();
const schema = {
    email: { 
        type: 'email',
        messages: {
            required: "Fill out email field!",
            email: "Email wrong!"
        }
    },
    displayName: { 
        type: 'string', min: 6,
        messages: {
            required: "Fill out username field!",
            stringMin: "Username at least 6 characters!"
        }
    },
    tenAdmin: { 
        type: 'string', min: 6,
        messages: {
            required: "Fill out admin name field!",
            stringMin: "Full name at least 6 characters!"
        }
    }
}

const check = valid.compile(schema);

const schemaPass = {
    password: { 
        type: 'string', min: 6,
        messages: {
            required: "Fill out password field!",
            stringMin: "Password at least 6 characters!"
        }
    }
}

const checkPass = valid.compile(schemaPass);

const schemaNewPass = {
    newPass: { 
        type: 'string', min: 6,
        messages: {
            required: "Fill out password field!",
            stringMin: "New password at least 6 characters!"
        }
    }
}

const checkNewPass = valid.compile(schemaNewPass);

module.exports = {
    createAdmin: (req, res) => {
        const data = req.body;
        var constraint = check(data);
        if(constraint !== true) return res.status(400).json(constraint);
        constraint = checkPass(data);
        if(constraint !== true) return res.status(400).json(constraint);
        admin.createData(data, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getAdmin: (req, res) => {
        admin.getAll((err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getAdminByID: (req, res) => {
        const id = req.params.id;
        admin.getDataByID(id, (err, results) => {
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
    updateAdmin: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        var constraint = check(data);
        if(constraint !== true) return res.status(400).json(constraint);
        constraint = checkPass(data);
        if(constraint !== true && data.isChangePass) return res.status(400).json(constraint);
        constraint = checkNewPass(data);
        if(constraint !== true && data.isChangePass) return res.status(400).json(constraint);
        admin.updateData(id, data, (err, results) => {
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
    deleteAdmin: (req, res) => {
        const id = req.params.id;
        admin.deleteData(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            if(results == 0) {
                return res.status(404).json('Record not found');
            }
            return res.status(200).json('Deleted successfully');
        })
    }
}