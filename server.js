const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors')

const app = express();

// config env
require("dotenv").config();

// db
mongoose
  .connect('mongodb+srv://mukul:mr112233@cluster0.ocovz.mongodb.net/data', {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(`Datbase connection error ${err}`));

// middleware
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors())

// route
const grad = require("./router/grad");
const tray = require("./router/tray");
const order = require("./router/order");
const product = require("./router/product");

app.use("/api", tray);
app.use("/api", grad);
app.use("/api", order);
app.use("/api", product);

// // frontend intergration
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// port
const port = process.env.PORT || 8000;

// listen
app.listen(port, console.log(`Server Runing on port ${port}`));
