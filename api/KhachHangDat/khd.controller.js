const khd = require('./khd.service');

<<<<<<< HEAD
// var user = require('../User/user.service');
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
    password: { 
        type: 'string', min: 6,
        messages: {
            required: "Fill out password field!",
            stringMin: "Password at least 6 characters!"
        }
    },
    displayName: { 
        type: 'string', min: 6,
        messages: {
            required: "Fill out username field!",
            stringMin: "Username at least 6 characters!"
        }
    },
    tenKH: { 
        type: 'string', min: 6,
        messages: {
            required: "Fill out full name field!",
            stringMin: "Full name at least 6 characters!"
        }
    },
    sdt: { 
        type: 'string', min: 10,
        messages: {
            required: "Fill out phone number field!",
            stringMin: "Phone at least 10 numbers!"
        }
    }
}
const check = valid.compile(schema);

module.exports = {
    createKHD: (req, res) => {
        const data = req.body;
        var constraint = check(data);
        if(constraint !== true) return res.status(400).json(constraint);
        khd.createData(data, (err, results) => {
            if(err) {
                console.log(err);
=======
 // var user = require('../User/user.service');
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
     password: { 
         type: 'string', min: 6,
         messages: {
             required: "Fill out password field!",
             stringMin: "Password at least 6 characters!"
         }
     },
     displayName: { 
         type: 'string', min: 6,
         messages: {
             required: "Fill out username field!",
             stringMin: "Username at least 6 characters!"
         }
     },
     tenKH: { 
         type: 'string', min: 6,
         messages: {
             required: "Fill out full name field!",
             stringMin: "Full name at least 6 characters!"
         }
     },
     sdt: { 
         type: 'string', min: 10,
         messages: {
             required: "Fill out phone number field!",
             stringMin: "Phone at least 10 numbers!"
         }
     }
 }
 const check = valid.compile(schema);

 module.exports = {
     createKHD: (req, res) => {
         const data = req.body;
         if (data.loaiTaiKhoan !== 1) {
            var constraint = check(data);
            if(constraint !== true) return res.status(400).json(constraint);
         }
         khd.createData(data, (err, results) => {
             if(err) {
                 console.log(err);
>>>>>>> db7a37515a0db321cfec7d87c4471bb930ef8aad
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