const router = require("express").Router();
const homeRoute = require("./home.route");
const userRoute = require("./user.route");
const quotesRoute = require("./quotes.route");

router.use("/", homeRoute);
router.use("/user", userRoute);
router.use("/quotes", quotesRoute);

module.exports = router;
