const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const manager = new ProductManager('productos.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {

  try { 
    
    const limit = Number(req.query.limit);
    console.log(limit);
    const products = await manager.getProducts();

    if (limit) {
      const slicedProd = products.slice(0,limit)
      res.status(200).json(slicedProd);
    } else {
      res.status(200).json(products);
    }
    

  } catch (error) {
    
    res.status(404).json({message: error.message});
  }


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
