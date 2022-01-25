const socket = io()

const btn_submit = document.getElementById('btn_submit')

btn_submit.addEventListener('click', (e) => {
    //console.log(e.target.value)
    e.preventDefault()
    let message = {
        author: document.getElementById('author').value,
        text: document.getElementById('message').value
    }
    document.getElementById('message').value = ""

    socket.emit('newMessage', message)
})

socket.on('messages', (data) =>  { 
    let content = data.reduce( (a, b, idx) => a + `<div><strong class="${ idx%2? 'text-danger':'text-success' }">${b.author}</strong>:<em> ${b.text}</em> </div>`, ` `)
    document.getElementById('lastMessage').innerHTML = content
})


