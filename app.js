const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const manager = new ProductManager('productos.json');

app.get('/products', async (req, res) => {
  const { limit } = req.query;
  const products = await manager.getProducts(limit);
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

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
