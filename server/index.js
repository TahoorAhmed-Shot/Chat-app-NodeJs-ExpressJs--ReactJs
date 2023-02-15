const express = require("express");
const app = express();
const port = 80;
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log(`user join id is ${socket.id} room id is ${data}`);
    socket.join(data)
  });

  socket.on("send_message", ({ room, message, name }) => {
     socket.to(room).emit("receive-message", {
      name,
      message,
    }); 
  });





  socket.on("disconnect", () => {
    console.log("user disconnected");
  });


});
app.get("/", (req, res) => {
  res.send("Hellow");
});
server.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
