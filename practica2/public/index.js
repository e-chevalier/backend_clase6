const socket = io()

const btn_submit = document.getElementById('btn_submit')

btn_submit.addEventListener('click', (e) => {
    //console.log(e.target.value)
    e.preventDefault()
    let elem_message = document.getElementById('message')
    let message = elem_message.value
    elem_message.value = ""
    console.log(message)
    socket.emit('newMessage', message)
})

socket.on('messages', (data) =>  { 
    let content = data.reduce( (a, b) => a + `<p>Socket ID: ${ b.socketid } ${ '->'} Mensaje: ${b.mensaje}</p>`, ` `)
    document.getElementById('lastMessage').innerHTML = content
})


