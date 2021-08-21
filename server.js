// -- IMPORTS --- //
const io = require('socket.io')(5000, {
    cors: {
        methods: ["GET","POST"]
    }
});

io.on('connection', socket => {
    socket.emit('chat-message', 'Hello client !' );
} ) 

