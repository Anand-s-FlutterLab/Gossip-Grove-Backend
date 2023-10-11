const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/", userController.signup);

router.get("/", userController.login);

router.get("/all", userController.getAllUsers);

router.get("/:id", userController.getUserbyId);

router.put("/update", userController.updateUserData);

router.put("/addNotificationToken", userController.addNotificationToken);

module.exports = router;