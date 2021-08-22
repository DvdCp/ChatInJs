// -- IMPORTS --- //
const io = require('socket.io')(5000, {
    cors: {
        methods: ["GET","POST"]
    }
});

// Very little db
const users = {}

// ---- CREATING CONNECTION ---- \\
io.on('connection', socket => {
    socket.on('new-user', data => {
        socket.broadcast.emit('new-user-connected', data)
        users[socket.id] = data
        console.log(getTimeStamp()+": USER LOGGED: "+data+"  Binded to: "+socket.id)
        
    }),
    socket.on('send-message', message => {
        console.log(getTimeStamp()+": "+message)
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
    }),
    socket.on('disconnect', () =>{
        socket.broadcast.emit('user-disconnected', users[socket.id])
        console.log(getTimeStamp()+": USER DISCONNECTED: "+users[socket.id]+"  Binded to: "+socket.id)
        delete users[socket.id]
        
    })
} ) 

// ---- UTILITY METHODS ---- \\
function getTimeStamp(){
    const DD_MM_YY = new Date().toLocaleDateString()
    const HH_MM_SS = new Date().toLocaleTimeString()

    return DD_MM_YY +" "+ HH_MM_SS
}