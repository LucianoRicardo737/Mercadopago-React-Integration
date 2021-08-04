require("dotenv").config();

// Configure your acces token from mercadopago.
const { ACCESS_TOKEN_MERCADOPAGO } = process.env;

const router = require("express").Router();
const fetch = require("node-fetch");

// Install and import mercadopago from npm.
const mercadopago = require("mercadopago");

// Load mercadopago acces token.
mercadopago.configurations.setAccessToken(ACCESS_TOKEN_MERCADOPAGO);

//  This route return the preferenceId with the configuration necessary to pay.
router.post("/create_preference", (req, res) => {
  const listItems = req.body;

// Set parameters of configuration. In this case only passed the product list.
  let preference = {
    items: listItems
  };
// Here the great problem. In the preferences can be return the payment data. But only if the client press the button return to web. 
// In the next route  (/webhook) im resolved this problem.

// Preference example with return on the button.
// let preference = {}
// preference = {
//   // ...
//   "back_urls": {
//         "success": "https://www.tu-sitio/success",
//         "failure": "http://www.tu-sitio/failure",
//         "pending": "http://www.tu-sitio/pending"
//     },
//     "auto_return": "approved",
//   // ...
// }


// And execute mercadolibre function. This return the id necessary to generate the button in the frontend.
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({ id: response.body.id });
    })
    .catch(function (error) {
      bg;
      console.log(error);
    });
});


// This route received all event from mercadopago. Then this point used for register the transactions. Return approved or pending payment.
// For this to work is necessary setting the return url in your mercadopago account. Only used https protocol.

// https://www.mercadopago.com.ar/developers/panel/notifications/ipn
router.post("/webhook", (req, res) => {
  res.json({
    Payment: req.query.id,
  });

  fetch(`https://api.mercadopago.com/v1/payments/${req.query.id}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN_MERCADOPAGO}`,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});

module.exports = router;
