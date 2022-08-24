const homePage = (req, res) => {
  return res.status(200).json({ status: "success", message: "Hello World" });
};

module.exports = { homePage };
