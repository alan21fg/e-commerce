import { Router } from 'express';
import _ from 'underscore';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();

// Leer el archivo JSON manualmente
const pagosPath = join(process.cwd(), 'src', 'pedidos.json');
const pagos = JSON.parse(readFileSync(pagosPath, 'utf-8'));

// Obtener todos los pagos
router.get('/', (req, res) => {
    res.json(pagos);
});

// Crear un nuevo pago
router.post('/', (req, res) => {
    const { id_pedido, id_metodo_pago, monto_total, fecha_pago } = req.body;
    if (id_pedido && id_metodo_pago && monto_total && fecha_pago) {
        const nuevoPago = { id_pago: pagos.length + 1, ...req.body };
        pagos.push(nuevoPago);
        res.json(pagos);
    } else {
        res.status(400).json({ error: 'Faltan datos para crear el pago' });
    }
});

// Actualizar un pago existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_pedido, id_metodo_pago, monto_total, fecha_pago } = req.body;
    let pago = pagos.find(p => p.id_pago == id);
    if (pago && id_pedido && id_metodo_pago && monto_total && fecha_pago) {
        pago.id_pedido = id_pedido;
        pago.id_metodo_pago = id_metodo_pago;
        pago.monto_total = monto_total;
        pago.fecha_pago = fecha_pago;
        res.json(pagos);
    } else {
        res.status(400).json({ error: 'Datos incorrectos o pago no encontrado' });
    }
});

// Eliminar un pago
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    pagos = pagos.filter(p => p.id_pago != id);
    res.json(pagos);
});

export default router;
