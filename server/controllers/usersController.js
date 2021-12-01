const User = require("../models/User");
const auth = require("../middleware/auth");

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    let userDTOs = [];
    users.forEach((user) => userDTOs.push(User.destruct(user)));

    return res.json({ users: userDTOs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// exports.getOne = async (req, res) => {
//   const userId = req.params.userId;
//   try {
//     const user = await User.findOneById(userId);
//     if (!user) return res.status(400).json({ message: "User not found" });
//     const userDTO = User.destruct(user);

//     return res.json(userDTO);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

exports.checkUnique = async (req, res) => {
  const userId = req.params.userId;
  const unique = await User.userIdUnique(userId);
  return res.json({ unique: unique });
};

exports.me = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findOneById(userId);
    return res.json(User.destruct(user));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.search = async (req, res) => {
  const searchId = req.params.userId;
  try {
    const users = await User.searchUsers(searchId);
    let userDTOs = [];
    users.forEach((user) => userDTOs.push(User.destruct(user)));

    return res.json({ users: userDTOs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.register = async (req, res) => {
  const { userId, name, role, password, location } = req.body;

  const unique = await User.userIdUnique(userId);
  if (unique) {
    try {
      const user = new User(userId, name, role, password, null, location);
      await user.create();
      const userDTO = User.destruct(user);
      return res.json(userDTO);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
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
        await User.changeState(userId, 1);
        return res
          .cookie("access_token", token, {
            expires: new Date(new Date().getTime() + 1 * 60 * 60000),
            sameSite: "strict",
            httpOnly: true,
          })
          .json({ loginSuccess: true, userId: userId });
      } else {
        return res.status(400).json({ loginSuccess: false, message: "Incorrect password" });
      }
    } else {
      return res.status(400).json({ message: `User with ${userId} not found` });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.logout = async (req, res) => {
  const userId = req.user.userId;
  try {
    await User.changeState(userId, 0);
    return res.cookie("access_token", "").json({ message: "Successfully logged out" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.delete = async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await User.deleteById(userId);
    if (result) {
      return res.json({ message: "Deletion successful" });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.update = async (req, res) => {
  const userId = req.user.userId;
  const { statusMessage, location } = req.body;
  try {
    if (statusMessage != null) {
      await User.updateStatusMessage(userId, statusMessage);
      return res.json({ message: "Status message updated" });
    }

    if (location != null) {
      await User.updateLocation(userId, location);
      return res.json({ message: "Location updated" });
    }
    return res.status(400).json({ message: "Bad request" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
