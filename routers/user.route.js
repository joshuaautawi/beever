const { create, login } = require("../controllers/userController");
const router = require("express").Router();

router.post("/", create);
router.post("/login", login);

module.exports = router;
