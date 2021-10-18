const User = require("../models/User");
const auth = require("../middleware/auth");

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getOne = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOneById(userId);
    return res.json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.me = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findOneById(userId);
    return res.json({
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.register = async (req, res) => {
  const { userId, name, role, password } = req.body;

  const unique = await User.userIdUnique(userId);
  if (unique) {
    try {
      const user = new User(userId, name, role, password);
      await user.create();
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something wnet wrong" });
    }
  } else {
    return res.status(400).json({ message: "ID already exists" });
  }
};

exports.login = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOneById(userId);

    if (user) {
      const match = User.validatePassword(password, user.password);
      if (match) {
        const token = auth.generateToken(user);
        return res
          .cookie("access_token", token, {
            expires: new Date(new Date().getTime() + 1 * 60 * 60000),
            sameSite: "strict",
            httpOnly: true,
          })
          .json({ loginSuccess: true, userId: userId });
      } else {
        return res
          .status(400)
          .json({ loginSuccess: false, message: "Incorrect password" });
      }
    } else {
      return res.status(400).json({ message: `User with ${email} not found` });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.logout = (req, res) => {
  return res
    .cookie("access_token", "")
    .json({ message: "Successfully logged out" });
};

exports.delete = async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await User.deleteById(userId);
    return res.json({ message: "Deletion successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
