const mongoose = require("mongoose");

async function checkConnection(req, res, next) {
  mongoose
    .connect(process.env.MONGO_CONNECTION_URL)
    .then(() => console.log("connected"))
    .catch((error) => console.error("Could not connect to MongoDB", error));
  next();
}

module.exports = {
  checkConnection: checkConnection,
};
