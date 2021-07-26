var RRC = require('./RRC.service');

module.exports = {
    index: (req, res) => {
        RRC.getAll((err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        })
    },
    show: (req, res) => {
        const id = req.params.id;
        RRC.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(results == null) {return res.status(404).json('Record not found');}
            return res.status(200).json(result);
        })
    },    
    getRRCByIDDDP: (req, res) => {
        const id = req.params.id;
        RRC.getDataByIdDDP(id, (err, results) => {
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
    store: (req, res) => {
        var data = req.body;
        RRC.getDataByUniToInsert(data.idDDP, data.idKHO, data.maPhong, (err, result) => {
            if(err) { try { res.status(500).json(err); } catch (error) {} }
            if(result != null){ try { return res.status(400).json("Room rental contract is Exists!"); } catch (error) {} }
            RRC.createData(data, (err, results) => {
                if(err) { return res.status(500).json(err); }
                if(results == null) { return res.status(400).json("Create failed!"); }
                res.status(200).json(results);
            })
        })
    },
    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        RRC.getDataByUniToUpdate(data.idDDP, data.idKHO, data.maPhong, id, (err, result) => {
            if(err) { try { res.status(500).json(err); } catch (error) {} }
            if(result != null){ try { return res.status(400).json("Room rental contract is Exists!"); } catch (error) {} }
            RRC.updateData(id, data, (err, result)=>{
                if(err) { return res.status(500).json(err); }
                return res.status(200).json('Update successfully');
            })
        })
    },
    updateStatusPaidByIDDDP: (req, res) => {
        const idDDP = req.params.id;
        const statusPaid = 1;
        RRC.updateStatusByIDDDP(idDDP, statusPaid, (err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json('Update successfully');
        })
    }
}