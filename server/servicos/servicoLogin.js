/* eslint-disable @typescript-eslint/no-var-requires */
// services/loginService.js
const servicoAutenticacao = require('./servicoAutenticacao');
// const bcrypt = require('bcryptjs');

/**
 * Login user.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const userResult = await servicoAutenticacao.findUserByEmail(email);

    // If no user is found, respond with 401 Unauthorized
    if (!userResult) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Validate the provided password against the stored hashed password
    const isPasswordValid = await servicoAutenticacao.validatePassword(password, userResult.user.senha);

    // If the password is not valid, respond with 401 Unauthorized
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Set up the session with user information
    req.session.user = {
      id: userResult.user.id,
      email: userResult.user.email,
      type: userResult.type,
    };

    // Respond with success message and user information
    res.status(200).json({ message: 'Login successful', user: req.session.user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  loginUser,
};
