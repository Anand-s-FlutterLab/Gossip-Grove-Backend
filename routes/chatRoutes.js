const router = require("express").Router();
const chatController = require("../controllers/chatController");

router.post("/", chatController.startIndividualMessage);

router.get("/", chatController.getChats);

router.get("/chatList", chatController.getChatList);

module.exports = router;
