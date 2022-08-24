const { checkPassword, encrypt } = require("../utils/encryption");
const { getToken } = require("../utils/jwt");
const { Users } = require("../models");

const create = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashPassword = encrypt(password);

    const data = await Users.create({
      email,
      password: hashPassword,
    });
    return res.status(201).json({ status: "success", data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let token;
    const user = await Users.findOne({
      where: {
        email,
      },
    });
    if (!user)
      return res
        .status(404)
        .json({ status: "failed", message: "email/user not found !" });
    if (checkPassword(password, user.password)) {
      token = getToken({ id: user.id, email: user.email });

      return res.status(200).json({ status: "success", token });
    } else
      return res
        .status(404)
        .json({ status: "failed", message: "password is not matched !" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error", error });
  }
};

module.exports = { create, login };
