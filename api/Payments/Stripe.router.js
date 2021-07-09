// const express = require('express');
// const router = express.Router();
// const stripe = require("stripe")("sk_test_51J9MUoGai0WbKbDB0RK9XLJIQ8AJXggnVxP5cpoOpPznPdlsW0RwWkXLYIf3mUEdDI1D9xtf5LEHK4Prfog5fsDn00vUDxGhtT");
// const { v4: uuid } = require("uuid");

// router.post('/stripe-checkout', async (req, res) => {
//     console.log("Request:", req.body);
  
//     let error;
//     let status;
//     try {
//         const { product, token } = req.body;
    
//         const customer = await stripe.customers.create({
//             email: token.email,
//             source: token.id
//         });

//         console.log('customer', customer);
    
//         const idempotency_key = uuid();
//         const charge = await stripe.charges.create(
//             {
//                 amount: product.price * 100,
//                 currency: "usd",
//                 customer: customer.id,
//                 receipt_email: token.email,
//                 description: `Purchased the ${product.name}`,
//             },
//             {
//                 idempotency_key
//             }
//         );
//         console.log("Charge:", { charge });
//         status = "success";
//     } catch (error) {
//         console.error("Error:", error);
//         status = "failure";
//     }
  
//     res.json({ error, status });
// });

// module.exports = router;