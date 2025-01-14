const express = require("express");
const app = express()
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];
//READ
app.get("/", (req, res) => {
    res.send(`
    <h1>Lista de Usuarios</h1>
        <ul>
            ${usuarios.map((usuario) => `
                <li>ID: ${usuario.id}, Nombre: ${usuario.nombre}, 
                Edad: ${usuario.edad}, 
                Procedencia: ${usuario.lugarProcedencia}
                </li>
                `)
                .join("")}
        </ul>

        <form action="/usuarios" method="post">

<label for="id">Id:</label>
<input type="text" id="id" name="id" required>
<br>
<label for="nombre">Nombre:</label>
<input type="text" id="nombre" name="nombre" required>
<br>
<label for="edad">Edad:</label>
<input type="text" id="edad" name="edad" required>
<br>
<label for="lugarProcedencia">Procedencia:</label>
<input type="text" id="lugarProcedencia" name="lugarProcedencia" required>
<br>
<button type="submit">Agregar Usuario</button>
</form>        
<a href="/usuarios">Usuarios JSON</a>
    `)
})

app.get("/usuarios", (req, res) => {
    res.json(usuarios)
})

//POST
app.post("/usuarios", (req, res) => {
    const nuevoUser = {
        id: req.body.id,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    }
    usuarios.push(nuevoUser);
    res.redirect("/")
})

//BUSCAR POR RUTAS
app.get("/usuarios/id/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const usuarioFind = usuarios.find((usuario) => usuario.id === id)
    if(!usuarioFind){
        return res.status(404).json({error: "Usuario No Encontrado"})
    }
    res.json(usuarioFind)
})
app.get("/usuarios/nombre/:nombre", (req, res) => {
    const nombre = req.params.nombre
    const usuarioFind = usuarios.find((usuario) => usuario.nombre === nombre)
    if(!usuarioFind){
        return res.status(404).json({error: "Usuario No Encontrado"})
    }
    res.json(usuarioFind)
})
app.get("/usuarios/edad/:edad", (req, res) => {
    const edad = parseInt(req.params.edad)
    const usuarioFind = usuarios.find((usuario) => usuario.edad === edad)
    if(!usuarioFind){
        return res.status(404).json({error: "Usuario No Encontrado"})
    }
    res.json(usuarioFind)
})
app.get("/usuarios/lugarProcedencia/:lugarProcedencia", (req, res) => {
    const lugarProcedencia = req.params.lugarProcedencia
    const usuarioFind = usuarios.find((usuario) => usuario.lugarProcedencia === lugarProcedencia)
    if(!usuarioFind){
        return res.status(404).json({error: "Usuario No Encontrado"})
    }
    res.json(usuarioFind)
})

//PATCH
app.patch("/usuarios/editar/:id", (req, res) => {
    const id = parseInt(req.params.id); 
    const usuario = usuarios.find((usuario) => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({ error: "Usuario No Encontrado" });
    }
    const { nombre, edad, lugarProcedencia } = req.body;
    
    if (nombre !== undefined) {
        usuario.nombre = nombre;
    }
    if (edad !== undefined) {
        usuario.edad = parseInt(edad);
    }
    if (lugarProcedencia !== undefined) {
        usuario.lugarProcedencia = lugarProcedencia;
    }
    res.json(usuario);
});

//DELETE
app.delete("/usuarios/eliminar/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const index = usuarios.findIndex((usuario) => usuario.id === id)

    if(index === -1){
        return res.status(404).json({ error: "Usuario No Encontrado" })
    }

    const eliminarUsuario = usuarios.splice(index, 1)

    res.json({ message: "Usuario Eliminado", usuario: eliminarUsuario[0] })
})

app.listen(PORT, () => {
    console.log(`Server Listening on Port: http://localhost/${PORT}`)
})

