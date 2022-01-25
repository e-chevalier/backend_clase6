import express from 'express'
import Handlebars from 'handlebars'
import { Contenedor } from './Contenedor.js'
import path from 'path';
import { engine } from 'express-handlebars';

const __dirname = path.resolve();

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}
                 Open link to http://127.0.0.1:${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))


const contenedor = new Contenedor('productos.txt')
const productos = await contenedor.getAll()
//productos.length = 0

const fakeApi = () => productos

app.get('/', (req, res) => {
    res.render('main', {productos: fakeApi(), isEmpty: fakeApi().length? false:true})
})

app.get('/productos', (req, res) => {
    res.render('main', {productos: fakeApi(), isEmpty: fakeApi().length? false:true})
})

app.post('/productos', (req, res) => {
    let prod = req.body
    if ( Object.keys(prod).length !== 0 && prod.title !== '' && prod.price !== '' && prod.thumbnail !== '') {
        const max = productos.reduce((a,b) => a.id > b.id ? a:b, {id: 0} )
        prod.id = max.id + 1
        productos.push(prod)
        contenedor.save(prod) 
    }
    res.render('form')
})









