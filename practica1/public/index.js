const socket = io()

const message = document.getElementById('message')

message.addEventListener('keyup', (e) => {
    console.log(e.target.value)
    //document.getElementById('newMessage').innerText = e.target.value
    socket.emit('message', e.target.value)
    socket.on('newMessage', (data) =>  document.getElementById('newMessage').innerText = e.target.value)
})


