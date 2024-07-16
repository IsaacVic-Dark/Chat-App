const socketIo = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');

// Allow requests from the frontend
app.use(cors({
    origin: 'http://localhost:5173' 
}));

const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:5173', 
        methods: ['GET', 'POST']
    }
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('chatMessage', (msg) => {
        console.log('Message received: ', msg);
        io.emit('chatMessage', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
