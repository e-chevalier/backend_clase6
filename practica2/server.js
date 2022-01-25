import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'ejs'); // registra el motor de plantillas


app.use(express.static('./public'))
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))

const messages = []

io.on('connection', (socket) => {
    // Emit all Massages on connection.
    io.sockets.emit('messages', messages)
    
    console.log('¡Nuevo cliente conectado!')  // - Pedido 1
    socket.on('newMessage', (data) => {
        messages.push({ socketid: socket.id, mensaje: data})
        console.log(messages)
        io.sockets.emit('messages', messages)
    })
    
})

app.get('/', (req, res) => { 
    res.render('index', {messages: messages})
})

// El servidor funcionando en el puerto 3000
httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${httpServer.address().port}
                 Open link to http://127.0.0.1:${httpServer.address().port}`)
})

httpServer.on("error", error => console.log(`Error en servidor ${error}`))

