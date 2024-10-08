import { Router } from 'express';
import _ from 'underscore';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();

// Leer el archivo JSON manualmente
const reseñasNegociosPath = join(process.cwd(), 'src', 'resenas_negocio.json');
const reseñasNegocios = JSON.parse(readFileSync(reseñasNegociosPath, 'utf-8'));

// Obtener todas las reseñas de negocios
router.get('/', (req, res) => {
    res.json(reseñasNegocios);
});

// Crear una nueva reseña para un negocio
router.post('/', (req, res) => {
    const { id_empresa, id_usuario, calificacion, comentario } = req.body;
    if (id_empresa && id_usuario && calificacion && comentario) {
        const nuevaReseña = { id_resena: reseñasNegocios.length + 1, ...req.body };
        reseñasNegocios.push(nuevaReseña);
        res.json(reseñasNegocios);
    } else {
        res.status(400).json({ error: 'Faltan datos para crear la reseña' });
    }
});

export default router;
