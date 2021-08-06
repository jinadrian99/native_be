var EF = require('./extraFee.service');

module.exports = {
    index: (req, res) => {
        EF.getAll((err, results) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(results)
        })
    },
    show: (req, res) => {
        const id = req.params.id;
        EF.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Record not exists!")}
            return res.status(200).json(result)
        })
    },
    store: (req, res) => {
        var data = req.body;
        EF.getDataByIDPTTnIDGPT(data.idGPT, data.idPTT, data.ghiChu, (err, resGet) => {
            if(err) { return res.status(500).json(err); }
            if(resGet.length == 0) { 
                EF.createData(data, (err, results) => {
                    if(err) { return res.status(500).json(err); }
                    if(results == null) { return res.status(400).json("Create failed!"); }
                    return res.status(200).json("Created successfully");
                })
            }
            if (resGet.length > 0) {
                console.log("resGet.data: ", resGet.length);
                return res.status(400).json("Surcharge existed!"); 
            }
        })
    },
    update: (req, res) => {
        var id = req.params.id;
        var data = req.body;
        EF.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Record not exists!")}
            EF.getDataByIdPTTnIdGPTnGhiChuPreventIdGPT(data.idPTT, data.idGPT, data.ghiChu, id, (err, result) => {
                if(err) { try { return res.status(500).json(err) } catch (error) {} }
                if(result.length > 0) { try { return res.status(400).json("Item exists!") } catch (error) {} }
                EF.updateData(id, data, (err, result) => {
                    if(err) { return res.status(500).json(err); }
                    return res.status(200).json("Updated successfully");
                })
            })
        })
    },
    destroy: (req, res) => {
        var id = req.params.id;
        EF.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Record not exists!")}

            EF.deleteData(id, (err, result) => {
                if(err) { return res.status(500).json(err); }
                return res.status(200).json("Deleted successfully")
            })
        })
    },
    getExtraFeeByIDPTT: (req, res) => {
        idPTT = req.params.idPTT;
        EF.getDataByIDPTT(idPTT, (err, data) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(data);
        })
    }
}