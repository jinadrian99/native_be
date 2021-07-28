var SafeOff = require('./SaveOff.service');

module.exports = {
    findWithTotalCost: (req, res) => {
        var money = parseFloat(req.body.tongTienPhong) + parseFloat(req.body.phiPhatSinh);
        var kq = {idKM: null, dinhMucGia: null, phanTramGiam: 0};
        SafeOff.getAll((err, results) => {
            if (err) { try { return res.status(500).json(err); } catch (error) {} }
            if(results.length != 0) { 
                results.map(item => { 
                    if(money >= item.dinhMucGia){
                        kq = item;
                    }
                })
            }
            try { return res.status(200).json(kq); } catch (error) {} 
        })
    }
}