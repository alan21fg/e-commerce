import { Router } from 'express';
import _ from 'underscore';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();

// Leer el archivo JSON manualmente
const negociosPath = join(process.cwd(), 'src', 'negocios.json');
const negocios = JSON.parse(readFileSync(negociosPath, 'utf-8'));

// Obtener todos los negocios
router.get('/', (req, res) => {
    res.json(negocios);
});

// Crear un nuevo negocio
router.post('/', (req, res) => {
    const { nombre_empresa, descripcion, telefono_contacto, sitio_web, direccion } = req.body;
    if (nombre_empresa && descripcion && telefono_contacto && sitio_web && direccion) {
        const nuevoNegocio = { id_empresa: negocios.length + 1, ...req.body };
        negocios.push(nuevoNegocio);
        res.json(negocios);
    } else {
        res.status(400).json({ error: 'Faltan datos para crear el negocio' });
    }
});

// Actualizar un negocio existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_empresa, descripcion, telefono_contacto, sitio_web, direccion } = req.body;
    let negocio = negocios.find(n => n.id_empresa == id);
    if (negocio && nombre_empresa && descripcion && telefono_contacto && sitio_web && direccion) {
        negocio.nombre_empresa = nombre_empresa;
        negocio.descripcion = descripcion;
        negocio.telefono_contacto = telefono_contacto;
        negocio.sitio_web = sitio_web;
        negocio.direccion = direccion;
        res.json(negocios);
    } else {
        res.status(400).json({ error: 'Datos incorrectos o negocio no encontrado' });
    }
});

// Eliminar un negocio
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    negocios = negocios.filter(n => n.id_empresa != id);
    res.json(negocios);
});

export default router;
