require("dotenv").config();
var admin = require("firebase-admin");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const http = require("http").Server(app);

const checkConnectionMiddleware = require("./middleware/connectionMiddleware");
const userJWTCheck = require("./middleware/userJWTCheck");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

const io = require("socket.io")(http);
const socketController = require("./controllers/socketController");

const serviceAccount = require("./config/push-notification-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (userId) => {
    socketController.userTracker.addUser(socket.id, userId);
  });

  socket.on("join_room", (chatId) => {
    socket.join(chatId);
  });

  socket.on("message", async (message_data) => {
    var { chatId, newMessage } = await socketController.socketChat({
      message_data: message_data,
    });
    if (newMessage != null) {
      socket.to(chatId).emit("message", newMessage);
    }
  });

  socket.on("disconnect", () => {
    socketController.userTracker.removeUser(socket.id);
  });
});

const notificationController = require("./controllers/notificationController");

app.use(express.json());
app.use(checkConnectionMiddleware.checkConnection);
app.get("/notifications", (req, res) => {
  notificationController.sendIndividualPushNotification({
    title: req.body.title,
    body: req.body.body,
    token: req.body.receiverToken,
  });
});
app.use("/user/all", userJWTCheck.userTokenCheck);
app.use("/user/update", userJWTCheck.userTokenCheck);
app.use("/user/addNotificationToken", userJWTCheck.userTokenCheck);
app.use("/user/:id", userJWTCheck.userTokenCheck);
app.use("/chat", userJWTCheck.userTokenCheck);

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

app.get("/serverRunningStatus", (req, res) => {
  res.status(200).send("Gossip Grove Server is Currntly Running");
});

http.listen(port, () => {
  console.log(`Server Started on ${port}`);
});
