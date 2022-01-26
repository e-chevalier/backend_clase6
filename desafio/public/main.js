const socket = io()

const btnForm_submit = document.getElementById('btnForm_submit')

btnForm_submit.addEventListener('click', (e) => {
    //console.log(e.target.value)
    e.preventDefault()
    let prod = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value, 
        thumbnail: document.getElementById('thumbnail').value
    }
    document.getElementById('title').value = ""
    document.getElementById('price').value = ""
    document.getElementById('thumbnail').value = ""

    socket.emit('newProduct', prod)
})

socket.on('products', (data) =>  { 
    let content = data.reduce( (a, b, idx) => a + 
        `<tr>
            <td>${b.title}</td>
            <td>$${b.price}</td>
            <td><img src="${b.thumbnail}" alt="${b.title}" width="32" height="32" /></td>
        </tr>`, ` `)
    document.getElementById('productsTable').innerHTML = content
})


