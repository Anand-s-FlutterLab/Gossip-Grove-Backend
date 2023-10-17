const admin = require("firebase-admin");

function sendIndividualPushNotification({ title, body, token }) {
  const payload = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };
  try {
    admin.messaging().send(payload);
    console.log("Notification sent successfully");
  } catch (e) {
    console.log(e);
  }
}

exports.sendIndividualPushNotification = sendIndividualPushNotification;
