import express from 'express';
const router = express.Router();
import Product from '../models/productModel.js';

// Create a new product
router.post('/', async (req, res) => {
  try {
    if(!req.body.name || !req.body.mrp || !req.body.packetSize || !req.body.status){
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = {
      name: req.body.name,
      mrp: req.body.mrp,
      packetSize: req.body.packetSize,
      status: req.body.status,
      image: req.body.image,
    };

    const product = await Product.create(newProduct);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
   return res.json({count:products.length, products:products});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.set(req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
