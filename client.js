// Getting server address
const socket = io('http://localhost:5000');

// HTML elements references
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container')

// ---- USERNAME INPUT ---- \\
const username = prompt("Hello ! Insert your username")
socket.emit('new-user', username)
userNotification("You joined")


// ---- RECEIVING METHODS  ---- \\
socket.on('chat-message', data => {
    appendMessage(data.name+": "+data.message)
})

socket.on('new-user-connected', user => {
    userNotification(user+' joined')
})

socket.on('user-disconnected', user => {
    userNotification(user+' disconnected')
})


// ---- SENDING MESSAGES ---- \\
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
    refreshChatDiv()    
}

// **** NEW USER JOINED NOTIFICATION ****
function userNotification(newUser){
    const newUserNotification = document.createElement('div')
    newUserNotification.setAttribute('class','centeredNotification')
    newUserNotification.innerText = newUser
    messageContainer.append(newUserNotification) 
    refreshChatDiv()
}

// **** SENT MESSAGE ****
function appendSentMessage(message){
    const messageElement = document.createElement('div')
    messageElement.setAttribute('class','sentMessage')
    messageElement.innerText = message
    messageContainer.append(messageElement)    
    refreshChatDiv()
}

// ---- REFRESH DIV ---- \\
function refreshChatDiv(){
    messageContainer.scrollTop = messageContainer.scrollHeight;
}