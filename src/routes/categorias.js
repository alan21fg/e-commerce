import { Router } from 'express';
import _ from 'underscore';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();

// Leer el archivo JSON manualmente
const categoriasPath = join(process.cwd(), 'src', 'categorias.json');
let categorias = JSON.parse(readFileSync(categoriasPath, 'utf-8')); // Cambiado a let

// Obtener todas las categorías
router.get('/', (req, res) => {
    res.json(categorias);
});

// Crear una nueva categoría
router.post('/', (req, res) => {
    const { nombre_categoria } = req.body;
    if (nombre_categoria) {
        const nuevaCategoria = { id_categoria: categorias.length + 1, nombre_categoria };
        categorias.push(nuevaCategoria);
        res.json(categorias);
    } else {
        res.status(400).json({ error: 'Falta el nombre de la categoría' });
    }
});

// Actualizar una categoría existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_categoria } = req.body;
    let categoria = categorias.find(c => c.id_categoria == id);
    if (categoria && nombre_categoria) {
        categoria.nombre_categoria = nombre_categoria;
        res.json(categorias);
    } else {
        res.status(400).json({ error: 'Datos incorrectos o categoría no encontrada' });
    }
});

// Eliminar una categoría
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    // Filtrar categorías y volver a asignar a la variable categorias
    categorias = categorias.filter(c => c.id_categoria != id);
    res.json(categorias);
});

export default router;
