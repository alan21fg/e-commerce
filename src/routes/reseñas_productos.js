import { Router } from 'express';
import _ from 'underscore';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();

// Leer el archivo JSON manualmente
const reseñasProductosPath = join(process.cwd(), 'src', 'resenas_productos.json');
const reseñasProductos = JSON.parse(readFileSync(reseñasProductosPath, 'utf-8'));

// Obtener todas las reseñas de productos
router.get('/', (req, res) => {
    res.json(reseñasProductos);
});

// Crear una nueva reseña de producto
router.post('/', (req, res) => {
    const { id_producto, id_usuario, calificacion, comentario, fecha_resena } = req.body;
    if (id_producto && id_usuario && calificacion && comentario && fecha_resena) {
        const nuevaReseña = { id_resena: reseñasProductos.length + 1, ...req.body };
        reseñasProductos.push(nuevaReseña);
        res.json(reseñasProductos);
    } else {
        res.status(400).json({ error: 'Faltan datos para crear la reseña' });
    }
});

// Actualizar una reseña de producto existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_producto, id_usuario, calificacion, comentario, fecha_resena } = req.body;
    let reseña = reseñasProductos.find(r => r.id_resena == id);
    if (reseña && id_producto && id_usuario && calificacion && comentario && fecha_resena) {
        reseña.id_producto = id_producto;
        reseña.id_usuario = id_usuario;
        reseña.calificacion = calificacion;
        reseña.comentario = comentario;
        reseña.fecha_resena = fecha_resena;
        res.json(reseñasProductos);
    } else {
        res.status(400).json({ error: 'Datos incorrectos o reseña no encontrada' });
    }
});

// Eliminar una reseña de producto
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    reseñasProductos = reseñasProductos.filter(r => r.id_resena != id);
    res.json(reseñasProductos);
});

export default router;
