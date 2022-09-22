// node server handle io socket.io
const io = require("socket.io")(1000);
const user = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    console.log("new user joind", name);
    user[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: user[socket.id],
    });
  });
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("leave", user[socket.id]);
    delete user[socket.id];
  });
});
