const socket = io("http://localhost:1000");
const form = document.getElementById("sends");
const messageInput = document.getElementById("message");
const messageContainer = document.querySelector(".container");
var audio = new Audio("../Assets/iphone-sms-tone-original-mp4-5732.mp3");
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);

  if (position == "left") {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`you: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
const name = prompt("enter your name to join");
socket.emit("new-user-joined", name);
socket.on("user-joined", (data) => {
  append(`${data} joined the chat`, "left");
});
socket.on("receive", (data) => {
  console.log(data);
  append(`${data.name}: ${data.message}`, "left");
});
socket.on("leave", (data) => {
  append(`${data}: left the chat`, "left");
});
