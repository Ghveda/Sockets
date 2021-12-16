const socket = io("http://localhost:3000", { transports: ["websocket"] });
const messageForm = document.getElementById("send-container");
const messageConatainer = document.getElementById("message-container");

const messageinput = document.getElementById("message-input");

const name = prompt("what is your name");
appendMessage("You connected");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageinput.value;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", message);
  messageinput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  messageConatainer.append(messageElement);
}
