const { homePage } = require("../controllers");
const router = require("express").Router();

router.get("/", homePage);

module.exports = router;
