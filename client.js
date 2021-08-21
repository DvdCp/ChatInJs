// Getting server address
const socket = io('http://localhost:5000');

// HTML elements references
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container')

// Asking for username
const username = prompt("Hello ! Insert your username")
socket.emit('new-user', username)

socket.on('chat-message', data => {
    appendMessage(data.name+": "+data.message)
})

socket.on('new-user-connected', data => {
    appendMessage(data+" joined") 
})

socket.on('user-disconnected', data => {
    appendMessage(data+" disconnected") 
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const messageToSend = messageInput.value
    if(messageToSend != "")
    {// empty message will be ignored
        socket.emit('send-message', messageToSend)
        appendMessage("You: "+messageToSend)
    }
    // Resetting message input field
    messageInput.value = "";
});

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)    
}