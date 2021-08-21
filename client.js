// Getting server address
const socket = io('http://localhost:5000');

// HTML elements references
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

socket.on('chat-message', data => {
    console.log(data)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const messageToSend = messageInput.value
    if(messageToSend != "") // empty message will be ignored
        socket.emit('send-message', messageToSend);
    // Resetting message input field
    messageInput.value = "";
});