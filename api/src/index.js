require("dotenv").config();
const { LOCAL,DNS_TESTING } = process.env;

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
  
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const whitelist = [`${DNS_TESTING}`, `${LOCAL}`];
app.use(
  cors({
    origin: whitelist,
    creadentials: true,
    optionsSuccessStatus: 200,
  })
);

app.set("port", 3000);
const server = app.listen(app.get("port"), () => {
  console.log(`Connection successful on port ${app.get("port")}`);
});

const checkOutPro_route = require("./routes/checkOutPro_routes");
app.use("/checkOutPro", checkOutPro_route);

module.exports = server;
