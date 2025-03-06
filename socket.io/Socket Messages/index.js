const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let users = [];

// Middleware to parse JSON bodies
app.use(express.json());

// HTTP endpoint to add a user
app.post('/addUser', (req, res) => {
    const user = req.body; // Expecting { id: '...', name: '...' }
    users.push(user);
    console.log({ length: users.length });

    io.emit('userAdded', { id: user.id, message: 'New user added' });
    res.status(201).json({ message: 'User added successfully', users });
});



io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for 'newUser' events from clients
    socket.on('newUser', (data) => {
        console.log('New user data received from client:', data);
        // Handle the data as needed
    });

    io.emit('newUser', { data: "hello" });

    socket.onAnyOutgoing((eventName, ...args) => {
        console.log('Event:', eventName);
        console.log('Arguments:', args);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


app.get("/", (req, res) => {
    console.log("check messages");

    io.emit("newUser", {
        id: "1",
        message: "hello",
    });

    return res.end("hello");

})

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
