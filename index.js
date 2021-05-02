// Khai báo tỗng
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

// Khai báo module
const sliderRouter = require('./api/Slider/slider.router');
const adminRouter = require('./api/Admin/admin.router');
const paypalRouter = require('./api/Paypal/paypal.router');

app.use(cors());
app.use(express.json());
// Send Data: Client <=> Server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

//code API
app.use('/api/slider', sliderRouter);
app.use('/api/admin', adminRouter);
app.use('/api/pay', paypalRouter);

const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AZ_heeHWMVUAG_uzXr-dmPI1N0uF7ZdON-TM8wpDt_WfiFK--SQOhfC2WOb_o-nCUc4KSvWRBY7w_DVs',
    'client_secret': 'EEfcOOu8KUe2lyke4PGBRqo9yv3OleIKvdLldX_kPLlCsq9ChOGeBVaRnLiuFJ3m-Q2h0gPjGU2P2-U7'
});

app.listen(process.env.PORT||process.env.APP_PORT, () => {
    console.log("Server running on 127.0.0.1:"+ process.env.APP_PORT||process.env.APP_PORT +"...");
});