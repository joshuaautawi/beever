const { sign, verify } = require("jsonwebtoken");

module.exports = {
  getToken: (payload) => {
    return sign(payload, "secret");
  },
  checkToken: (token) => {
    return verify(token, "secret");
  },
};
