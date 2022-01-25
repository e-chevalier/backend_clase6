const socket = io()

const message = document.getElementById('message')

message.addEventListener('keyup', (e) => {
    console.log(e.target.value)
    //document.getElementById('newMessage').innerText = e.target.value
    socket.emit('newMessage', e.target.value)
})

socket.on('messages', (data) =>  document.getElementById('lastMessage').innerText = data)


