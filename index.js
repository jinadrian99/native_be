// Khai báo tỗng
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
// Send Data: Client <=> Server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

//
require('./scheduler');

// Khai báo module
const sliderRouter = require('./api/Slider/slider.router');
const roomTypeRouter = require('./api/RoomType/roomType.router');
const imageRoomTypeRouter = require('./api/ImageRoomType/imageRoomType.router');
const serviceRouter = require('./api/Service/service.router');
const imageServiceRouter = require('./api/ImageService/imageService.router');
const dailyRateRouter = require('./api/DailyRate/dailyRate.router');
const userRouter = require('./api/User/user.router');
const khdRouter = require('./api/KhachHangDat/khd.router');
const adminRouter = require('./api/Admin/admin.router');
const paypalRouter = require('./api/Payments/paypal.router');
// const stripeRouter = require('./api/Payments/Stripe.router');
const specialRateRouter = require('./api/SpecialRate/specialRate.router');
const roomRouter = require('./api/Room/room.router');
const detailBookServiceRouter = require('./api/BookServiceDetail/BSD.router');
const bookingServiceRouter = require('./api/BookingService/bookingService.router');
const bookingRouter = require('./api/Booking/booking.router');
const detailBookingRouter = require('./api/BookingDetail/BookingD.router');
const detailBillRouter = require('./api/BillDetail/BillD.router');
const customerStayRouter = require('./api/CustomerStay/CustomerStay.router');
const saleOffRouter = require('./api/SaleOff/SaleOff.router');
const billRouter = require('./api/Bill/Bill.router');
const rrcRouter = require('./api/RoomRentalContract/RRC.router');
const resetPassRouter = require('./api/ResetPass/resetPass.router');
// const payerRouter = require('./api/Payer/Payer.router');

const sendmailRouter = require('./api/Mail/mail.router');
const chartRouter = require('./api/Chart/chart.router');


app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

//code API
app.use('/api/slider', sliderRouter);
app.use('/api/roomtype', roomTypeRouter);
app.use('/api/roomtype-image', imageRoomTypeRouter);
app.use('/api/service', serviceRouter);
app.use('/api/service-image', imageServiceRouter);
app.use('/api/daily-rate', dailyRateRouter);
app.use('/api/special-rate', specialRateRouter);
app.use('/api/user', userRouter);
app.use('/api/khd', khdRouter);
app.use('/api/room', roomRouter);
app.use('/api/detail-book-service', detailBookServiceRouter);
app.use('/api/booking-service', bookingServiceRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/detail-booking', detailBookingRouter);
app.use('/api/detail-bill', detailBillRouter);
app.use('/api/customer-stay', customerStayRouter);
app.use('/api/sale-off', saleOffRouter);
app.use('/api/bill', billRouter);
app.use('/api/rrc', rrcRouter);
app.use('/api/reset-pass', resetPassRouter);
// app.use('/api/payer', payerRouter);


app.use('/api/admin', adminRouter);
app.use('/api/pay', paypalRouter);
// app.use('/api/payments', stripeRouter);
app.use('/api/mail', sendmailRouter);
app.use('/api/chart', chartRouter);


app.listen(process.env.PORT||process.env.APP_PORT, () => {
    console.log("Server running on http://127.0.0.1:"+ process.env.APP_PORT||process.env.APP_PORT +"...");
});