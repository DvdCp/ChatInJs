// -- IMPORTS --- //
const io = require('socket.io')(5000, {
    cors: {
        methods: ["GET","POST"]
    }
});

// Very little db
const users = {}

// Creating connection
io.on('connection', socket => {
    socket.on('new-user', data => {
        socket.broadcast.emit('new-user-connected', data)
        users[socket.id] = data
        console.log(getTimeStamp()+": New user logged: "+data+"  Binded to: "+socket.id)
        
    }),
    socket.on('send-message', message => {
        console.log(getTimeStamp()+": "+message)
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
    })
} ) 

// Utility methods
function getTimeStamp(){
    const DD_MM_YY = new Date().toLocaleDateString()
    const HH_MM_SS = new Date().toLocaleTimeString()

    return DD_MM_YY +" "+ HH_MM_SS
}