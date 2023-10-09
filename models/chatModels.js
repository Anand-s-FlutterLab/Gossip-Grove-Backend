const mongoose = require("mongoose");

// Define the schema for the chat
const chatSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
    unique: true,
  },
  chatType: {
    type: String,
    enum: ["one-on-one", "group"], // You can specify the possible chat types here
  },
  chats: {
    type: Object,
    of: [
      {
        senderId: String,
        sendTime: String,
        message: String,
        timestamp:String,
      },
    ],
    default: {},
  },
});

// Create the Mongoose model for the chat
const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
