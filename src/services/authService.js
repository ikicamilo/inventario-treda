const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");
const { hashPassword } = require("../utils/hashPassword");

const register = async (nomUsu, emailUsu, passUsu, rolUsu, codSed) => {
  const hashedPassword = await hashPassword(passUsu);

  const newUser = await Usuario.create({
    nomUsu,
    emailUsu,
    passUsu: hashedPassword,
    rolUsu,
    codSed,
  });

  return newUser;
};

const login = async (emailUsu, passUsu) => {
  const user = await Usuario.findOne({ where: { emailUsu } });

  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(passUsu, user.passUsu);

  if (!isMatch) {
    return null;
  }

  const token = jwt.sign(
    {
      userId: user.codIntUsu,
      email: user.emailUsu,
      role: user.rolUsu,
      sede: user.codSed,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = {
  register,
  login,
};
