const router = require('express').Router();
const { Category, Product } = require('../../models');
const { create } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const findCategories = await Category.findAll(
      {
        include: {
          model: Product,
          attributes: ['product_name']
        }
      });
    res.status(200).json(findCategories)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const findOneCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!findOneCategory) {
      res.status(400).json({ message: 'No category found with that ID' })
      return
    }
    res.status(200).json(findOneCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      })
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
