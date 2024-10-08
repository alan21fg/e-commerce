import { Router } from 'express';
import _ from 'underscore';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();

// Leer el archivo JSON manualmente
const pedidosPath = join(process.cwd(), 'src', 'pedidos.json');
const pedidos = JSON.parse(readFileSync(pedidosPath, 'utf-8'));

// Obtener todos los pedidos
router.get('/', (req, res) => {
    res.json(pedidos);
});

// Crear un nuevo pedido
router.post('/', (req, res) => {
    const { id_usuario, fecha_pedido, estado_pedido } = req.body;
    if (id_usuario && fecha_pedido && estado_pedido) {
        const nuevoPedido = { id_pedido: pedidos.length + 1, ...req.body };
        pedidos.push(nuevoPedido);
        res.json(pedidos);
    } else {
        res.status(400).json({ error: 'Faltan datos para crear el pedido' });
    }
});

export default router;
