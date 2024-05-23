/* eslint-disable @typescript-eslint/no-var-requires */
// controllers/authController.js
const {findUserByEmail, validatePassword} = require("../servicos/login");

const login = async (req, res) => {
  const { email, senha } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isValidPassword = await validatePassword(
    senha,
    user.user.senha
  );

  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  req.session.userId = user.user.id;
  req.session.userType = user.type;

  const redirectUrl =
    user.type === "aluno" ? "/aluno-dashboard" : "/professor-dashboard";
  return res.json({ message: "Login successful", redirectUrl });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful" });
  });
};

module.exports = {
  login, logout
}