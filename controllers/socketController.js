const notificationController = require("./notificationController");

function userTracker() {
  const activeUsers = new Map(); // Use a Map to store the user IDs and socket IDs

  function addUser(socketId, userID) {
    activeUsers.set(userID, socketId);
  }

  function removeUser(socketId) {
    for (const [userID, userSocketId] of activeUsers.entries()) {
      if (userSocketId === socketId) {
        activeUsers.delete(userID);
        break; // Exit the loop once the user is removed
      }
    }
  }

  function isUserActive(userID) {
    return activeUsers.has(userID);
  }

  function getActiveUsers() {
    return activeUsers;
  }

  return {
    addUser,
    removeUser,
    isUserActive,
    getActiveUsers, // Include this method to return the activeUsers Map
  };
}

const userTrack = userTracker();
const activeUsersMap = userTrack.getActiveUsers(); // You can now get the activeUsers Map


async function socketChat({ message_data }) {
  const {
    chatId,
    senderId,
    receiverId,
    sendTime,
    date,
    message,
    chatType,
    receiverToken,
    senderName,
  } = message_data;
  let isUserActive = await userTrack.isUserActive(receiverId);
  if (isUserActive) {
    const newMessage = {
      chatId: chatId,
      senderId: senderId,
      receiverId: receiverId,
      sendTime: sendTime,
      date: date,
      message: message,
      chatType: chatType,
    };
    return { chatId: chatId, newMessage: newMessage };
  } else {
    notificationController.sendIndividualPushNotification({
      title: senderName,
      body: message,
      token: receiverToken,
    });
    return { chatId: chatId, newMessage: null };
  }
}

module.exports = { userTracker: userTrack, socketChat: socketChat };
