const khd = require('./khd.service');

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
     displayName: { 
         type: 'string', min: 2,
         messages: {
             required: "Fill out username field!",
             stringMin: "Username at least 2 characters!"
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
    newPassword: { 
        type: 'string', min: 6,
        messages: {
            required: "Fill out password field!",
            stringMin: "New password at least 6 characters!"
        }
    }
}

const checkNewPass = valid.compile(schemaNewPass);

 module.exports = {
     createKHD: (req, res) => {
         const data = req.body;
         if (data.loaiTaiKhoan !== 1) {
            var constraint = check(data);
            if(constraint !== true) return res.status(400).json(constraint);
            constraint = checkPass(data);
            if(constraint !== true) return res.status(400).json(constraint);
         }
         khd.createData(data, (err, results) => {
             if(err) {
                 console.log(err);
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
        var constraint = check(data);
        if(constraint !== true) return res.status(400).json(constraint);
        constraint = checkPass(data);
        if(constraint !== true && data.isChangePass) return res.status(400).json(constraint);
        constraint = checkNewPass(data);
        if(constraint !== true && data.isChangePass) return res.status(400).json(constraint);
        if (!data.isBooking) {
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
        }
        else {
            khd.getDataByID(id, (err, resKhdID) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
                if(resKhdID == null) {
                    return res.status(404).json('Record not found');
                }
                if (data.CMND !== resKhdID[0].CMND) {
                    khd.getDataByCMND(data.CMND, (err, resKhCMND) => {
                        if (err) {
                            return res.status(500).json(err);
                        }
                        if(resKhCMND.length !== 0) { 
                            return res.status(400).json('ID Card existed!!!');
                        }
                        if (data.Passport !== null) {
                            if (data.Passport !== resKhdID[0].Passport ) {
                                khd.getDataByPassport(data.Passport, (err, resKhPassport) => {
                                    if (err) {
                                        return res.status(500).json(err);
                                    }
                                    if(resKhPassport.length !== 0) { 
                                        return res.status(400).json('Passport existed!!!');
                                    }
                                    if (resKhPassport.length == 0) {
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
                                    }
                                })
                            }
                            else {
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
                            }
                        }
                        else {
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
                        }
                    })
                }
                else {
                    if (data.Passport !== null) {
                        if (data.Passport !== resKhdID[0].Passport ) {
                            khd.getDataByPassport(data.Passport, (err, resKhPassport) => {
                                if (err) {
                                    return res.status(500).json(err);
                                }
                                if(resKhPassport.length !== 0) { 
                                    return res.status(400).json('Passport existed!!!');
                                }
                                if (resKhPassport.length == 0) {
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
                                }
                            })
                        }
                        else {
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
                        }
                    }
                    else {
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
                    }
                }
            })
        }
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