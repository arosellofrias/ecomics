// server configs
const express = require("express");
const app = express();
const volleyball = require("volleyball");
const db = require("./db")
const routes = require("./routes")
//const {Cart, CartItem, Order, OrderItem, Product, User} = require("./models")

// logging middleware
app.use(volleyball);

app.use(express.static("build"))

// parsing middleware
app.use(express.json());

app.use("/api",routes)



app.use("/api", (req, res) => {
  res.sendStatus(404);
});

app.use((req, res) => {
//   res.sendFile(__dirname + "/build/index.html");
});
// error middleware -> https://expressjs.com/es/guide/error-handling.html
app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});
db.sync({force:false})
.then(function () {
    // Recién ahora estamos seguros que la conexión fue exitosa
    app.listen(3000, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);