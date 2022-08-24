const express = require("express");
const router = require("./routers/index");

require("dotenv").config();

const app = express();
app.use(express.json({ extended: false, limit: "50mb" }));

app.use("/", router);

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 3000;
app.listen(port, () => console.log("Server listening on port " + port));
