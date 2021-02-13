const express = require("express");
require("dotenv/config");
require("./config/mongoose");

const port = process.env.port || 8000;

const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded());

app.use(bodyParser.json());
app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
