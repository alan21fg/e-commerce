import { Router } from 'express';
import _ from 'underscore';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();

// Leer el archivo JSON manualmente
const listaDeseadosPath = join(process.cwd(), 'src', 'lista_deseados.json');
const listaDeseados = JSON.parse(readFileSync(listaDeseadosPath, 'utf-8'));

// Obtener toda la lista de deseados
router.get('/', (req, res) => {
    res.json(listaDeseados);
});

// Añadir un producto a la lista de deseados
router.post('/', (req, res) => {
    const { id_usuario, id_producto } = req.body;
    if (id_usuario && id_producto) {
        const nuevoDeseado = { id: listaDeseados.length + 1, ...req.body };
        listaDeseados.push(nuevoDeseado);
        res.json(listaDeseados);
    } else {
        res.status(400).json({ error: 'Faltan datos para agregar el producto a la lista de deseados' });
    }
});

// Contar cuántos usuarios han agregado un producto a su lista de deseados
router.get('/contar/:id_producto', (req, res) => {
    const { id_producto } = req.params;
    const count = listaDeseados.filter(d => d.id_producto == id_producto).length;
    res.json({ id_producto, count });
});

// Eliminar un producto de la lista de deseados
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    listaDeseados = listaDeseados.filter(d => d.id != id);
    res.json(listaDeseados);
});

export default router;
