const express = require('express');
const paypal = require('paypal-rest-sdk');
const router = express.Router();

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AZ_heeHWMVUAG_uzXr-dmPI1N0uF7ZdON-TM8wpDt_WfiFK--SQOhfC2WOb_o-nCUc4KSvWRBY7w_DVs',
    'client_secret': 'EEfcOOu8KUe2lyke4PGBRqo9yv3OleIKvdLldX_kPLlCsq9ChOGeBVaRnLiuFJ3m-Q2h0gPjGU2P2-U7'
});

router.post('/', (req, res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://nativecity.herokuapp.com/api/pay/success",
            "cancel_url": "https://nativecity.herokuapp.com/api/pay/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [
                    {
                        "name": "Room Rose",
                        "sku": "001",
                        "price": "5.00",
                        "currency": "USD",
                        "quantity": 1
                    }
                ]
            },
            "amount": {
                "currency": "USD",
                "total": "5.00"
            },
            "description": "Hat for the best team ever" 
        }]
    };
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length; i++){
                if(payment.links[i].rel === 'approval_url'){
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});

router.get('/success', (req, res) => {
    var paymentId = req.query.paymentId;
    var payerId = { payer_id: req.query.PayerID };
    
    paypal.payment.execute(paymentId, payerId, function(error, payment){
      if(error){
        console.error(JSON.stringify(error));
      } else {
        if (payment.state == 'approved'){
          return res.json('payment completed successfully');
        } else {
          return res.json('payment not successful');
        }
      }
    });
});

router.get('/cancel', (req, res) => res.json('Cancelled'));

module.exports = router;