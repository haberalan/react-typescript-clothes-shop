const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '365d' });
};

const signup = async (req, res) => {
  const { email, password, phone } = req.body;

  try {
    const user = await User.signup(email, password, phone);

    const token = createToken(user._id);

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const user_id = req.user._id;
  const { password } = req.body;

  try {
    const user = await User.deleteUser(user_id, password);

    // delete all data associated with user

    res.status(200).json({ email: user.email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { signup, login, deleteUser };
