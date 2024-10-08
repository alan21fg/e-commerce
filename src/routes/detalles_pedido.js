import { Router } from 'express';
import _ from 'underscore';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();

// Leer el archivo JSON manualmente
const detallesPedidosPath = join(process.cwd(), 'src', 'detalles_pedido.json');
const detallesPedidos = JSON.parse(readFileSync(detallesPedidosPath, 'utf-8'));

// Obtener todos los detalles de pedidos
router.get('/', (req, res) => {
    res.json(detallesPedidos);
});

// Crear un nuevo detalle de pedido
router.post('/', (req, res) => {
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
    if (id_pedido && id_producto && cantidad && precio_unitario) {
        const nuevoDetalle = { id_detalle: detallesPedidos.length + 1, ...req.body };
        detallesPedidos.push(nuevoDetalle);
        res.json(detallesPedidos);
    } else {
        res.status(400).json({ error: 'Faltan datos para crear el detalle del pedido' });
    }
});

// Actualizar un detalle de pedido existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
    let detalle = detallesPedidos.find(d => d.id_detalle == id);
    if (detalle && id_pedido && id_producto && cantidad && precio_unitario) {
        detalle.id_pedido = id_pedido;
        detalle.id_producto = id_producto;
        detalle.cantidad = cantidad;
        detalle.precio_unitario = precio_unitario;
        res.json(detallesPedidos);
    } else {
        res.status(400).json({ error: 'Datos incorrectos o detalle no encontrado' });
    }
});

// Eliminar un detalle de pedido
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    detallesPedidos = detallesPedidos.filter(d => d.id_detalle != id);
    res.json(detallesPedidos);
});

export default router;
