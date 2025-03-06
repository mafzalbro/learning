// socket/socket.js
const {Server} = require('socket.io');

const setupSocket = (server) => {
    const io = new Server(server);
    
    io.on('connection', (socket) => {
        console.log('New client connected');
        
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
    
    return io;
};

module.exports = setupSocket;
