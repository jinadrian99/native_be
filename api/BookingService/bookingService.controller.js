var BookingService = require('./bookingService.service');

module.exports = {
    index: (req, res) => {
        BookingService.getAll((err, results) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(results)
        })
    },
    show: (req, res) => {
        const id = req.params.id;
        BookingService.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Record not exists!")}
            return res.status(200).json(result)
        })
    },
    getDddvByIdkhd: (req, res) => {
        const idKHD = req.params.id;
        BookingService.getDataByIdkhd(idKHD, (err, results) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(results)
        })
    },
    store: (req, res) => {
        var data = req.body;
        BookingService.createData(data, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Create failed!"); }
            return res.status(200).json(result);
        })
    },
    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        BookingService.updateData(id, data, (err, results) => {
            if(err) { return res.status(500).json(err); }
            if(results == null) { return res.status(400).json("Record not exists!");}
            console.log("update BookingService: ", results);
            return res.status(200).json('Updated successfully');
        })
    },
    updateStatusByIDToCompleted: (req, res) => {
        const id = req.params.id;
        const status = 2; // status 1: chưa thanh toán, 2: hoàn tất thanh toán
        BookingService.getDataByID(id, (err, result) => {
            if(err) { try { res.status(500).json(err); } catch (err) {} }
            BookingService.updateStatusDataByID(id, status, (err, result)=>{
                if(err) { try { res.status(500).json(err)} catch (err) {} }
                try { res.status(200).json("change status to completed: successfully") } catch (err) {}
            })
        })
    },
    destroy: (req, res) => {
        var id = req.params.id;
        BookingService.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Record not exists!")}

            BookingService.deleteData(id, (err, result) => {
                if(err) { return res.status(500).json(err); }
                return res.status(200).json("Deleted successfully")
            })
        })
    },
}