import express from 'express'
import { Contenedor } from './Contenedor.js'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
//import Handlebars from 'handlebars'
import { engine } from 'express-handlebars';

//import path from 'path';
//const __dirname = path.resolve();

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))

// defino el motor de plantilla
app.engine('.hbs', engine({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutDir: "views/layouts/",
    partialsDir: "views/partials/"
})
)

app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', '.hbs'); // registra el motor de plantillas

httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${httpServer.address().port}
                 Open link to http://127.0.0.1:${httpServer.address().port}`)
})

httpServer.on("error", error => console.log(`Error en servidor ${error}`))


const contenedor = new Contenedor('productos.txt')
const products = await contenedor.getAll()
//productos.length = 0

const fakeApi = () => products

/**
 * 
 */

 io.on('connection', (socket) => {
    // Emit all Massages on connection.
    io.sockets.emit('products', products)
    
    console.log('¡Nuevo cliente conectado!')  // - Pedido 1

    socket.on('newProduct', (prod) => {
        if (Object.keys(prod).length !== 0 && prod.title !== '' && prod.price !== '' && prod.thumbnail !== '') {
            const max = products.reduce((a, b) => a.id > b.id ? a : b, { id: 0 })
            prod.id = max.id + 1
            products.push(prod)
            contenedor.save(prod)
        }
        console.log(prod)
        io.sockets.emit('products', products)
    })
    
})


app.get('/', (req, res) => {
    res.render('main', { productos: fakeApi(), isEmpty: fakeApi().length ? false : true })
})

/*
app.get('/productos', (req, res) => {
    res.render('main', { productos: fakeApi(), isEmpty: fakeApi().length ? false : true })
})

app.post('/productos', (req, res) => {
    let prod = req.body
    if (Object.keys(prod).length !== 0 && prod.title !== '' && prod.price !== '' && prod.thumbnail !== '') {
        const max = productos.reduce((a, b) => a.id > b.id ? a : b, { id: 0 })
        prod.id = max.id + 1
        productos.push(prod)
        contenedor.save(prod)
    }
    res.render('form')
})
*/









