import { Router } from 'express';
import _ from 'underscore';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();

// Leer el archivo JSON manualmente
const usuariosPath = join(process.cwd(), 'src', 'usuarios.json');
let usuarios = JSON.parse(readFileSync(usuariosPath, 'utf-8')); // Cambiado a let

router.get('/', (req, res) => {
    res.json(usuarios);
});

router.post('/', (req, res) => {
    const { nombre_usuario, email, contrasena } = req.body;
    if (nombre_usuario && email && contrasena) {
        const nuevoUsuario = { id_usuario: usuarios.length + 1, ...req.body };
        usuarios.push(nuevoUsuario);
        res.json(usuarios);
    } else {
        res.status(400).json({ error: 'Faltan datos' });
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_usuario, email, contraseña } = req.body;
    let usuario = usuarios.find(u => u.id_usuario == id);
    if (usuario && nombre_usuario && email && contraseña) {
        usuario.nombre_usuario = nombre_usuario;
        usuario.email = email;
        usuario.contraseña = contraseña;
        res.json(usuarios);
    } else {
        res.status(400).json({ error: 'Datos incorrectos' });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    // Filtrar usuarios y volver a asignar a la variable usuarios
    usuarios = usuarios.filter(u => u.id_usuario != id);
    res.json(usuarios);
});

export default router;
