// -- IMPORTS --- //
const io = require('socket.io')(5000, {
    cors: {
        methods: ["GET","POST"]
    }
});

io.on('connection', socket => {
    socket.on('send-message', message => {
        console.log(getTimeStamp()+": "+message)
        socket.broadcast.emit('chat-message', message)
    })
} ) 


// Utility methods
function getTimeStamp(){
    const DD_MM_YY = new Date().toLocaleDateString()
    const HH_MM_SS = new Date().toLocaleTimeString()
    
    return DD_MM_YY +" "+ HH_MM_SS
}