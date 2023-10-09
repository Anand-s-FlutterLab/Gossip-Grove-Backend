require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const checkConnectionMiddleware = require("./middleware/connectionMiddleware");
const userJWTCheck = require("./middleware/userJWTCheck");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use(express.json());
app.use(checkConnectionMiddleware.checkConnection);

app.use("/user/all", userJWTCheck.userTokenCheck);
app.use("/user/update", userJWTCheck.userTokenCheck);
app.use("/user/:id", userJWTCheck.userTokenCheck);
app.use("/chat", userJWTCheck.userTokenCheck);

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

app.get("/serverRunningStatus", (req, res) => {
  res.status(200).send("Gossip Grove Server is Currntly Running");
});

app.listen(port, () => {
  console.log(`Server Started on ${port}`);
});
