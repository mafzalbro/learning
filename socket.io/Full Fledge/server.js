// server.js
const express = require('express');
const http = require('http');
const setupSocket = require('./socket/socket');
const userRoutes = require('./routes/userRoutes');
const attachSocket = require('./middleware/attachSocket');
const { availableMemory } = require('process');
const { availableParallelism } = require('os');


console.log(
    availableMemory(),
    availableParallelism()
);


const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

app.use(attachSocket(io));

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api', userRoutes);

// Start server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
