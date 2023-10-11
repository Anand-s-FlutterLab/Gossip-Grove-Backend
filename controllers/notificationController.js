const admin = require("firebase-admin");

function sendIndividualPushNotification({ title, body, token }) {
  const payload = {
    notification: {
      title: title,
      body: body,
    },
    token:
      "dU_oI_R2TSGsMOwy7ZsISY:APA91bHHY7EQut2S7qDEVZz6dtObCo3vCTN_HhvO9zH6ykEtAJNgh7oDvakea25LjXmt5CFfiZ11l8WcXCSBuqbs-1yHkICyfHUV-KvsZulUaz1OLygTpd0osvdYLnMflGEUpNdMofVD",
  };
  admin
    .messaging()
    .send(payload)
    .then((result) => {
      console.log(payload);
      console.log(result);
    });
}

exports.sendIndividualPushNotification = sendIndividualPushNotification;
