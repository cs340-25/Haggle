import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";


const app = express();
const server = createServer(app as any);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket) => {
    console.log('New connection!');

    socket.on('switchroom', (roomNum) => {
        if (socket.rooms.size > 1) {
            for (const room of socket.rooms) {
                if (room != socket.id) {
                    socket.leave(room);
                }
            }
        }
        
        socket.join(roomNum);
    })

    socket.on('myevent', (msg) => {
        if (socket.rooms.size == 2) {
            for (const room of socket.rooms) {
                if (room != socket.id) {
                    console.log(`Sending "${msg}" to room ${room}`);
                    io.to(room).emit('myevent', msg);
                    break;
                }
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('Someone disconnected.');
    });
});


server.listen(8080, () => {
    console.log('Server running on port 8080...');
});