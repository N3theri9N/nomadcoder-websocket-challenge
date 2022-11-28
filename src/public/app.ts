const socket: WebSocket = new WebSocket(`wss://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("connected to Server");
});

socket.addEventListener("message", (message: MessageEvent) => {
  console.log("Just got this: ", message.data, "From the server");
});

socket.addEventListener("close", () => {
  console.log("disconnected from Server");
});

setTimeout(() => {
  socket.send("Hello from the browser!");
}, 10000);
