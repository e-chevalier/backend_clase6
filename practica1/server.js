import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 3000

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static('./public'))
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})
// El servidor funcionando en el puerto 3000
httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${httpServer.address().port}
                 Open link to http://127.0.0.1:${httpServer.address().port}`)
})

httpServer.on("error", error => console.log(`Error en servidor ${error}`))

const mensajes = []

io.on('connection', (socket) => {
    // "connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('Usuario conectado')
    // Se imprimirá solo la primera vez que se ha abierto la conexión
    socket.emit('mi mensaje', 'Este es mi mensaje desde el servidor')
    socket.on('notificacion', data => console.log(data))

    /* Envio los mensajes al cliente que se conectó*/
    socket.emit('mensajes', mensajes);

    /*Escucho los mensajes enviados por el cliente y se los propago a todos*/
    socket.on('mensaje', data => {
        mensajes.push({ socketid: socket.id, mensaje: data })
        console.log(mensajes)
        io.sockets.emit('mensajes', mensajes);
    });

})