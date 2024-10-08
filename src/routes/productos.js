import { Router } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();

// Leer el archivo JSON manualmente
const productosPath = join(process.cwd(), 'src', 'productos.json');
let productos = JSON.parse(readFileSync(productosPath, 'utf-8'));

// Obtener todos los productos
router.get('/', (req, res) => {
    res.json(productos);
});

// Crear un nuevo producto
router.post('/', (req, res) => {
    console.log('Cuerpo de la solicitud:', req.body); // Agregar este registro
    const { id_negocio, id_categoria, nombre_producto, descripcion_producto, precio, link_compra, fecha_creacion, ultima_actualizacion } = req.body;
    
    // Cambia aquí para reflejar los campos correctos
    if (id_negocio && id_categoria && nombre_producto && descripcion_producto && precio && link_compra && fecha_creacion && ultima_actualizacion) {
        const nuevoProducto = { id_producto: productos.length + 1, ...req.body }; // Mantén la estructura del objeto
        productos.push(nuevoProducto);
        res.json(productos);
    } else {
        console.log('Faltan datos:', { id_negocio, id_categoria, nombre_producto, descripcion_producto, precio, link_compra, fecha_creacion, ultima_actualizacion }); // Registrar qué datos faltan
        res.status(400).json({ error: 'Faltan datos para crear el producto' });
    }
});

// Actualizar un producto existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_negocio, id_categoria, nombre_producto, descripcion_producto, precio, link_compra, fecha_creacion, ultima_actualizacion } = req.body;
    let producto = productos.find(p => p.id_producto == id);
    if (producto) {
        producto.id_negocio = id_negocio;
        producto.id_categoria = id_categoria;
        producto.nombre_producto = nombre_producto;
        producto.descripcion_producto = descripcion_producto;
        producto.precio = precio;
        producto.link_compra = link_compra;
        producto.fecha_creacion = fecha_creacion;
        producto.ultima_actualizacion = ultima_actualizacion;
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
