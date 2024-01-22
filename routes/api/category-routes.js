const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    try {
        const categoriesData = await Category.findAll({
            include: [{ model: Product }]
        });
        res.status(200).json(categoriesData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [{ model: Product }]
        });
        console.log(categoryData);
    
        if (!categoryData) {
            res.status(404).json({ message: 'Category with this ID could not be found.' });
            return;
        }
    
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    Category.create(req.body)
    .then((categoryData) => {
        res.status(200).json(categoryData);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
    Category.update(req.body, {
        where: {
          id: req.params.id,
        },
    })
    .then((category) => {
        return res.json(category);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
    try {
        const categoryData = await Category.destroy({
            where: {
                id: req.params.id
            }
        });
    
        if (!categoryData) {
            res.status(404).json({ message: 'Category with this ID could not be found.' });
            return;
        }
    
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
