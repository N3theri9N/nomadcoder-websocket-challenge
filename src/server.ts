import http from "http";
import WebSocket, { Data } from "ws";
import express from "express";
import { Express, Request, Response } from "express";

const app: Express = express();

app.set("view engine", "pug");
app.set("views", "src/views");
app.use("/public", express.static("dist/public"));
app.get("/", (_: Request, res: Response) => res.render("home"));
app.get("/*", (_: Request, res: Response) => res.redirect("/"));

const handleListen: () => void = () => {
  console.log("this is typeScript");
  console.log(`Listening on http://localhost:3000`);
};

const server: http.Server = http.createServer(app);
const wss: WebSocket.Server = new WebSocket.Server({ server });

// Put all your backend code here.
function onSocketClose(): void {
  console.log("Disconnected From Browser");
}
function onSocketMessage(message: Data): void {
  console.log(message);
}

wss.on("connection", (socket: WebSocket) => {
  console.log("connected to Browser");
  socket.on("close", onSocketClose);
  socket.on("message", onSocketMessage);
  socket.send("Hello!!!");
});

server.listen(process.env.PORT, handleListen);
