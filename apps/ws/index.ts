type ClientData = { id: string };

const PORT = Number(process.env.PORT ?? 8080);
const ROOM = "chat";

const server = Bun.serve<ClientData>({
  port: PORT,

  fetch(req, server) {
    // Upgrade HTTP requests to WebSocket connections
    const upgraded = server.upgrade(req, {
      data: { id: crypto.randomUUID() },
    });
    if (upgraded) return;

    return new Response("WebSocket server is running. Connect with ws://", {
      status: 426,
    });
  },

  websocket: {
    open(ws) {
      ws.subscribe(ROOM);
      ws.send(JSON.stringify({ type: "welcome", id: ws.data.id }));
      server.publish(ROOM, JSON.stringify({ type: "join", id: ws.data.id }));
      console.log(`connected: ${ws.data.id}`);
    },

    message(ws, message) {
      // Broadcast every message to all other connected clients
      ws.publish(
        ROOM,
        JSON.stringify({ type: "message", from: ws.data.id, text: String(message) }),
      );
    },

    close(ws) {
      ws.unsubscribe(ROOM);
      server.publish(ROOM, JSON.stringify({ type: "leave", id: ws.data.id }));
      console.log(`disconnected: ${ws.data.id}`);
    },
  },
});

console.log(`WebSocket server listening on ws://localhost:${server.port}`);
