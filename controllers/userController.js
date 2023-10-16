const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const socketController = require("./socketController");

async function login(req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(200)
      .send({ success: false, data: "Invalid Email or Password" });
  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePassword)
    return res
      .status(200)
      .send({ success: false, data: "Invalid Email or Password" });
  const token = jwt.sign({ _id: user._id }, process.env.JWTKEY);
  return res.status(200).send({ success: true, data: user._id, token });
}

async function signup(req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(200)
      .send({ success: false, data: "User Already Registered" });

  const hashedPassword = await generateHash(req.body.password);

  newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    userProfileUrl: req.body.userProfileUrl,
    notificationToken: req.body.notificationToken,
    status: req.body.status,
  });

  await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, process.env.JWTKEY);

  return res.status(201).send({ success: true, data: newUser._id, token });
}

async function getAllUsers(req, res) {
  let user = await User.find();
  return res.status(200).send({ success: true, data: user });
}

async function updateUserData(req, res) {
  try {
    const updateData = {
      username: req.body.username,
      phone: req.body.phone,
      userProfileUrl: req.body.userProfileUrl,
      status: req.body.status,
    };

    if (req.body.change_password) {
      const hashedPassword = await generateHash(req.body.password);
      updateData.password = hashedPassword;
    }

    const result = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true }
    );
    return res.status(200).send({ success: true, data: result });
  } catch (err) {
    return res.status(200).send({ success: false, data: err.message });
  }
}

async function addNotificationToken(req, res) {
  try {
    const result = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { notificationToken: req.body.notificationToken } },
      { new: true }
    );
    return res
      .status(200)
      .send({ success: true, data: "Notification Added Successfully" });
  } catch (err) {
    return res.status(200).send({ success: false, data: err.message });
  }
}

async function getUserOnlineStatus(req, res) {
  try {
    const result = await socketController.userTracker.isUserActive(
      req.body.receiverId
    );
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(200).send({ success: false, data: err.message });
  }
}

async function generateHash(password) {
  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
  return bcrypt.hash(password, salt);
}

module.exports = {
  login: login,
  signup: signup,
  getAllUsers: getAllUsers,
  updateUserData: updateUserData,
  addNotificationToken: addNotificationToken,
  getUserOnlineStatus: getUserOnlineStatus,
};
