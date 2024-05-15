import express from 'express'
import { readFile, writeFile } from 'fs/promises'
import { nanoid } from 'nanoid'
import path from 'path';
const __dirname = import.meta.dirname


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

const pathFile = __dirname + "/data/deportes.json"

app.get('/deportes', async (req, res) => {
    try {
        const stringDeportes = await readFile(pathFile, 'utf8')
        const deportes = JSON.parse(stringDeportes)
        return res.json(deportes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

app.get('/deportes/create', async (req, res) => {
    try {
        const nombre = req.query.nombre
        const precio = req.query.precio

        const newDeporte = {
            nombre: nombre,
            precio: precio,
            id: nanoid()
        }

        const stringDeportes = await readFile(pathFile, 'utf8')
        const deportes = JSON.parse(stringDeportes)

        deportes.push(newDeporte)

        await writeFile(pathFile, JSON.stringify(deportes))

        return res.json(deportes)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

app.get('/deportes/delete/:id', async (req, res) => {
    try {

        const id = req.params.id

        const stringDeportes = await readFile(pathFile, 'utf8')
        const deportes = JSON.parse(stringDeportes)

        const deporte = deportes.find(item => item.id === id)
        if (!deporte) {
            return res.status(404).json({ ok: false, msg: "Deporte no encontrado" })
        }

        const newDeportes = deportes.filter((item) => item.id !== id)
        await writeFile(pathFile, JSON.stringify(newDeportes))
        return res.json(newDeportes)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

app.get('/deportes/update/:id', async (req, res) => {
    try {

        const id = req.params.id
        const { nombre = "", precio = "" } = req.query

        const stringDeportes = await readFile(pathFile, 'utf8')
        const deportes = JSON.parse(stringDeportes)

        const deporte = deportes.find(item => item.id === id)
        if (!deporte) {
            return res.status(404).json({ ok: false, msg: "Deporte no encontrado" })
        }

        deporte.nombre = nombre
        deporte.precio = precio

        await writeFile(pathFile, JSON.stringify(deportes))
        return res.json(deportes)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor andando en http://localhost:${PORT}`))


