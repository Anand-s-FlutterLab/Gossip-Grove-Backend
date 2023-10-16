const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/", userController.signup);

router.get("/", userController.login);

router.get("/all", userController.getAllUsers);

router.put("/update", userController.updateUserData);

router.put("/addNotificationToken", userController.addNotificationToken);

router.get("/getUserOnlineStatus", userController.getUserOnlineStatus);

module.exports = router;