import { Router } from 'express';
import _ from 'underscore';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();

const metodosPago = [
    { id_metodo_pago: 1, nombre_metodo: 'Tarjeta de crédito' },
    { id_metodo_pago: 2, nombre_metodo: 'PayPal' }
];

router.get('/', (req, res) => {
    res.json(metodosPago);
});

export default router;
