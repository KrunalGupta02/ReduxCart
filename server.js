// sk_test_51N0gGCSFgEvc804sXRbqn7PVAqYEagc1ng3tYnQxnvffXnRFrZrrVzF0C2Ezioc02N6sWxvNpgbiam6krPVeIvvU00ES7SYUbT;
// Masala theroy - price_1N0gXFSFgEvc804se6a1OdKg
// Jugaadi Adda - price_1N0gY4SFgEvc804s0UfBxACz
// La Milano Pizzeria - price_1N0gZhSFgEvc804scw6OWoZF

const express = require("express");

// Cors allows any ip address to access our express server
var cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51N0gGCSFgEvc804sXRbqn7PVAqYEagc1ng3tYnQxnvffXnRFrZrrVzF0C2Ezioc02N6sWxvNpgbiam6krPVeIvvU00ES7SYUbT"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  /*
    req.body.items
    [
        {
            id:1,
            quantity:3
        }
    ]
     */

  // Stripe wants
  /*
    [
        {
            price: 1,
            quantity: 3,
        }
    ]
     */
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.qnty,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http//localhost:3000/success",
    cancel_url: "http//localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("Listening on the port 4000"));
