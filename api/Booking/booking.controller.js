var Booking = require('./booking.service');

module.exports = {
    getDataWasDepositInBill: (req, res) => {
        Booking.getDataWasDepositInBill(2, (err, results) => {
            if (err) { return res.status(500).json(err); }
            return res.status(200).json(results);
        })
    },
    index: (req, res) => {
        Booking.getAll((err, results) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(results)
        })
    },
    show: (req, res) => {
        const id = req.params.id;
        Booking.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Record not exists!")}
            return res.status(200).json(result)
        })
    },
    showByIdKHD: (req, res) => {
        const id = req.params.id;
        Booking.getDataByIdKHD(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Record not exists!")}
            return res.status(200).json(result)
        })
    },
    store: (req, res) => {
        var data = req.body;
        Booking.createData(data, (err, results) => {
            if(err) { return res.status(500).json(err); }
            if(results == null) { return res.status(400).json("Create failed!"); }
            res.status(200).json(results);
        })
    },
    getDDPByIdKHDWithStatusRRCIsUsing: (req, res) => {
        var idKHD = req.params.id;
        var statusRRC = 2; // 2: complete deposit -> using (1: complete paid -> kh chuẩn bị về)

        Booking.getDataByIdKHDWithStatusRRC(idKHD, statusRRC, (err, results) => {
            if(err) { try { return res.status(500).json(err); } catch (error) {} }
            try { return res.status(200).json(results); } catch (error) {}
        })
    },
    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        console.log("id DDP: ", id);
        console.log("data update DDP: ", data);
        Booking.updateData(id, data, (err, results) => {
            if(err) { return res.status(500).json(err); }
            if(results == null) { return res.status(400).json("Record not exists!");}
            console.log("update booking: ", results);
            return res.status(200).json('Updated successfully');
        })
    },
    destroy: (req, res) => {
        var id = req.params.id;
        Booking.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json("Record not exists!")}

            Booking.deleteData(id, (err, result) => {
                if(err) { return res.status(500).json(err); }
                return res.status(200).json("Deleted successfully")
            })
        })
    },
}