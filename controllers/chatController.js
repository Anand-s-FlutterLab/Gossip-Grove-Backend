const Chat = require("../models/chatModels");

async function sendIndividualMessage(req, res) {
  try {
    const conversation = await Chat.findOne({ chatId: req.body.chatId });

    if (!conversation) {
      const newMessage = new Chat({
        chatId: req.body.chatId,
        chatType: req.body.chatType,
        chats: {
          [req.body.date]: [
            {
              senderId: req.body.senderId,
              sendTime: req.body.sendTime,
              message: req.body.message,
              timeStamp: req.body.timeStamp,
            },
          ],
        },
      });
      await newMessage.save();
      console.log(1);
      return res.status(200).send({ success: true, data: newMessage });
    }

    if (!conversation.chats[req.body.date]) {
      conversation.chats[req.body.date] = [];
    }
    conversation.chats[req.body.date].push({
      senderId: req.body.senderId,
      sendTime: req.body.sendTime,
      message: req.body.message,
    });

    conversation.markModified("chats");

    await conversation.save().then(() => {
      res.send({ success: true, data: conversation});
    });
  } catch (error) {
    console.error(error);
    return res.status(200).send({ success: false, data: error.message });
  }
}

async function getChats(req, res) {
  try {
    const conversation = await Chat.findOne({ chatId: req.body.chatId });
    if (!conversation) {
      console.log(conversation);
      return res
        .status(200)
        .send({ success: true, data: "No Messages in this conversation" });
    }
    return res.status(200).send({ success: true, data: conversation });
  } catch (error) {
    return res.status(200).send({ success: false, data: error.message });
  }
}

async function getChatList(req, res) {
  try {
    const conversations = await Chat.find({
      chatId: { $regex: req.user._id, $options: "i" },
    });

    const chatIds = conversations.map((conversation) => conversation.chatId);

    return res
      .status(200)
      .send({ success: true, data: chatIds, userID: req.user._id });
  } catch (error) {
    return res.status(200).send({ success: false, data: error.message });
  }
}

module.exports = {
  startIndividualMessage: sendIndividualMessage,
  getChats: getChats,
  getChatList: getChatList,
};
