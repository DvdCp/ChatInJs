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
    userNotification(data)
})

socket.on('user-disconnected', data => {
    appendMessage(data+" disconnected") 
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();

    const messageToSend = messageInput.value
    if(messageToSend != "") // empty message will be ignored
    {   
        socket.emit('send-message', messageToSend)
        appendSentMessage("You: "+messageToSend)
    }
    // Resetting input field
    messageInput.value = "";
});



// ---- DIV CREATION METHODS ---- \\

// **** RECIVED MESSAGE ****
function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.setAttribute('class','recivedMessage')
    messageElement.innerText = message
    messageContainer.append(messageElement)    
}

// **** NEW USER JOINED NOTIFICATION ****
function userNotification(newUser){
    const newUserNotification = document.createElement('div')
    newUserNotification.setAttribute('class','centeredNotification')
    newUserNotification.innerText = newUser + " joined"
    messageContainer.append(newUserNotification) 
}

// **** SENT MESSAGE ****
function appendSentMessage(message){
    const messageElement = document.createElement('div')
    messageElement.setAttribute('class','sentMessage')
    messageElement.innerText = message
    messageContainer.append(messageElement)    
}