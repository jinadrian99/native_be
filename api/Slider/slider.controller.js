const { 
    createData,
    getAll, 
    getDataByID,
    updateData,
    deleteData
} = require('./slider.service');

module.exports = {
    createSlider: (req, res) => {
        const data = req.body;
        createData(data, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json('DB conn Error');
            }
            return res.status(200).json(results);
        });
    },
    getSliders: (req, res) => {
        getAll((err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json('DB conn Error');
            }
            return res.status(200).json(results);
        });
    },
    getSliderByID: (req, res) => {
        const id = req.params.id;
        getDataByID(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json('DB conn Error');
            }
            if(results == null) {
                return res.status(404).json('Record not found');
            }
            return res.status(200).json(results);
        });
    },
    updateSlider: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        updateData(id, data, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json('DB conn Error');
            }
            if(results == null) {
                return res.status(404).json('Record not found');
            }
            return res.status(200).json('Updated successfully');
        });
    },
    deleteSlider: (req, res) => {
        const id = req.params.id;
        deleteData(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json('DB conn Error');
            }
            if(results == 0) {
                return res.status(404).json('Record not found');
            }
            return res.status(200).json('Deleted successfully');
        });
    }
}