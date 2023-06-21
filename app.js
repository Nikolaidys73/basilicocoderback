const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const manager = new ProductManager('productos.json');

app.get('/products', async (req, res) => {
  console.log('Se recibió una solicitud GET en la ruta /products');
  const { limit } = req.query;
  const products = manager.getProducts(parseInt(limit));
  res.json(products);
});

app.get('/products/:pid', async (req, res) => {
  const { pid } = req.params;
  const product = await manager.getProductById(parseInt(pid));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080');
});
