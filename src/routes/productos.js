import { Router } from 'express';
import _ from 'underscore';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();

// Leer el archivo JSON manualmente
const productosPath = join(process.cwd(), 'src', 'productos.json');
const productos = JSON.parse(readFileSync(productosPath, 'utf-8'));

// Obtener todos los productos
router.get('/', (req, res) => {
    res.json(productos);
});

// Crear un nuevo producto
router.post('/', (req, res) => {
    const { id_empresa, nombre_producto, descripcion_producto, precio, categoria, fecha_creacion, tipo, link_compra } = req.body;
    if (id_empresa && nombre_producto && descripcion_producto && precio && categoria && fecha_creacion && tipo && link_compra) {
        const nuevoProducto = { id_producto: productos.length + 1, ...req.body };
        productos.push(nuevoProducto);
        res.json(productos);
    } else {
        res.status(400).json({ error: 'Faltan datos para crear el producto' });
    }
});

// Actualizar un producto existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_empresa, nombre_producto, descripcion_producto, precio, categoria, tipo, link_compra } = req.body;
    let producto = productos.find(p => p.id_producto == id);
    if (producto && id_empresa && nombre_producto && descripcion_producto && precio && categoria && tipo && link_compra) {
        producto.id_empresa = id_empresa;
        producto.nombre_producto = nombre_producto;
        producto.descripcion_producto = descripcion_producto;
        producto.precio = precio;
        producto.categoria = categoria;
        producto.tipo = tipo;
        producto.link_compra = link_compra;
        res.json(productos);
    } else {
        res.status(400).json({ error: 'Datos incorrectos o producto no encontrado' });
    }
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    productos = productos.filter(p => p.id_producto != id);
    res.json(productos);
});

export default router;
