// Khai báo tỗng
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

// Khai báo module
const sliderRouter = require('./api/Slider/slider.router');

app.use(cors());
app.use(express.json());
// Send Data: Client <=> Server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//code API
app.use('/api/slider', sliderRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Server running on 127.0.0.1:"+ process.env.APP_PORT +"...");
});