const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    try {
        const tagsData = await Tag.findAll({
            include: [{ model: Product, through: ProductTag, as: 'tagged_products'}]
        });
        res.status(200).json(tagsData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get('/:id', async (req, res) => {
    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [{ model: Product, through: ProductTag, as: 'tagged_products'}]
        });
    
        if (!tagData) {
            res.status(404).json({ message: 'Tag with this ID could not be found.' });
            return;
        }
    
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
    Tag.create(req.body)
    .then((tag) => {
      // ProductTag through model adapted from product-routes version
      if (req.body.productIds.length) {
        const productTagIdArr = req.body.productIds.map((tag_id) => {
          return {
            product_id,
            tag_id: tag.id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(tag);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
    // ProductTag through model adapted from product-routes version
      if (req.body.product && req.body.product.length) {
        
        ProductTag.findAll({
          where: { tag_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ product_id }) => product_id);
          const newProductTags = req.body.productIds
          .filter((product_id) => !productTagIds.includes(product_id))
          .map((product_id) => {
            return {
              product_id,
              tag_id: req.params.id
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ product_id }) => !req.body.productIds.includes(product_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(tag);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
    try {
        const tagData = await Tag.destroy({
            where: {
                id: req.params.id
            }
        });
    
        if (!tagData) {
            res.status(404).json({ message: 'Tag with this ID could not be found.' });
            return;
        }
    
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
