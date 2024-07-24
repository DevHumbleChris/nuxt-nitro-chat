import type { Peer, Message } from "crossws";

const room = "ROOMED";
export default defineWebSocketHandler({
  open(peer) {
    console.log("opened WS", peer.url);
    peer.subscribe(room);
    peer.publish(room, "Another user joined the chat");
  },
  close(peer) {
    console.log("closed WS", peer);
  },
  error(peer, error) {
    console.log("error on WS", peer, error);
  },
  message(peer, message) {
    console.log("message on WS", peer, message);
    onCalc(peer, message);
    peer.publish(room, message.text());
  },
});

function onCalc(peer: Peer, message: Message) {
  if (message.text().startsWith("calc ")) {
    const equation = message.text().replace("calc ", "");
    const result = eval(equation);
    peer.send(`The result of "${equation}" is: ${result}`);
  }
}
