const admin = require("firebase-admin");

function sendIndividualPushNotification({ title, body, token }) {
  const payload = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };
  admin
    .messaging()
    .send(payload)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.sendIndividualPushNotification = sendIndividualPushNotification;
