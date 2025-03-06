// middleware/socketMiddleware.js
const attachSocket = (io) => {
    return (req, res, next) => {
        req.io = io;
        next();
    };
};

module.exports = attachSocket