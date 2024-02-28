import express from 'express';
const router = express.Router();
import Category from '../models/categoryModel.js';

// Create a new category
router.post('/', async (req, res) => {
  try {
    if(!req.body.name || !req.body.description || !req.body.status){
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newCategory = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,

    };

    const category = await Category.create(newCategory);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Category
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
   return res.json({count:categories.length, categories:categories});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single Category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a Category
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    category.set(req.body);
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.remove();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
