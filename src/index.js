import express from 'express';
import morgan from 'morgan';

// Rutas importadas
import usuariosRoutes from './routes/usuarios.js';
import negociosRoutes from './routes/negocios.js';
import reseñasNegociosRoutes from './routes/reseñas_negocio.js';
import pedidosRoutes from './routes/pedidos.js';
import metodosPagoRoutes from './routes/metodos_pago.js';
import pagosRoutes from './routes/pagos.js';
import detallesPedidoRoutes from './routes/detalles_pedido.js';
import productosRoutes from './routes/productos.js';
import listaDeseadosRoutes from './routes/lista_deseados.js';
import reseñasProductosRoutes from './routes/reseñas_productos.js';
import categoriasRoutes from './routes/categorias.js';

const app = express();

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/negocios', negociosRoutes);
app.use('/api/reseñas_negocios', reseñasNegociosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/metodos_pago', metodosPagoRoutes);
app.use('/api/pagos', pagosRoutes);
app.use('/api/detalles_pedido', detallesPedidoRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/lista_deseados', listaDeseadosRoutes);
app.use('/api/reseñas_productos', reseñasProductosRoutes);
app.use('/api/categorias', categoriasRoutes);

// Iniciando servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});