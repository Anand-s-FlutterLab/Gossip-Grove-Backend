const notificationController = require("../controllers/notificationController");
const router = require("express").Router();

router.get("/", function (req, res) {
  const { senderName, message, receiverToken } = req.body;
  notificationController.sendIndividualPushNotification({
    title: senderName,
    body: message,
    token: receiverToken,
  });
  return res.send({ success: true, data: "Message Sent" });
});

module.exports = router;
