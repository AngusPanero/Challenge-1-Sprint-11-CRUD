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

    `)
})

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

app.listen(PORT, () => {
    console.log(`Server Listening on Port: http://localhost/${PORT}`)
})

