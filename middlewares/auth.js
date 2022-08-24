const { verify } = require("jsonwebtoken");
const { Users } = require("../models");
const { checkToken } = require("../utils/jwt");

async function isLogin(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res.status(401).json({
        status: "failed",
        message: "Not authorized , please Login ",
        error: e,
      });
    const { email } = checkToken(token);
    req.user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (req.user) next();
    else throw new Error();
  } catch (e) {
    return res.status(401).json({
      status: "failed",
      message: "Not authorized , please Login ",
      error: e,
    });
  }
}

module.exports = { isLogin };
