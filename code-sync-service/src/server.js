const { ACTIONS } = require("./actions");

const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});

const PORT = 4000;

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId]
        }
    });
};

// io.to() -> send details to everyone include the sender
// socket.in() -> send details to others

io.on("connection", (socket) => {

    console.log(`Connected using socketId::${socket.id}`);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {

        console.log(`user joined with roomId::${roomId} and username::${username}`);

        userSocketMap[socket.id] = username;

        socket.join(roomId);

        const clients = getAllConnectedClients(roomId);

        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id
            });
        });

    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        console.log(`Code change by socketId::${socket.id} in roomId::${roomId}`);
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        console.log(`Syncing code for socketId::${socketId}`);
        socket.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on("disconnecting", () => {
        console.log(`Disconnecting socketId::${socket.id}`);
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id]
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});