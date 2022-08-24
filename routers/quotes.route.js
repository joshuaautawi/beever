const {
  create,
  findQuoteFromAPI,
  getAllQuotes,
  setFavorite,
  deleteQuote,
} = require("../controllers/quotesController");
const { isLogin } = require("../middlewares/auth");
const router = require("express").Router();

router.post("/", isLogin, create);
router.get("/api", isLogin, findQuoteFromAPI);
router.get("/", isLogin, getAllQuotes);
router.patch("/", isLogin, setFavorite);
router.delete("/", isLogin, deleteQuote);

module.exports = router;
