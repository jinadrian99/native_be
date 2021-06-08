// Khai báo tỗng
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

// Khai báo module
const sliderRouter = require('./api/Slider/slider.router');
const roomTypeRouter = require('./api/RoomType/roomType.router');
const imageRoomTypeRouter = require('./api/ImageRoomType/imageRoomType.router');
const serviceRouter = require('./api/Service/service.router');
const imageServiceRouter = require('./api/ImageService/imageService.router');
const dailyRateRouter = require('./api/DailyRate/dailyRate.router');
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
app.use('/api/roomtype', roomTypeRouter);
app.use('/api/roomtype-image', imageRoomTypeRouter);
app.use('/api/service', serviceRouter);
app.use('/api/service-image', imageServiceRouter);
app.use('/api/daily-rate', dailyRateRouter);

app.use('/api/admin', adminRouter);
app.use('/api/pay', paypalRouter);


app.listen(process.env.PORT||process.env.APP_PORT, () => {
    console.log("Server running on http://127.0.0.1:"+ process.env.APP_PORT||process.env.APP_PORT +"...");
});