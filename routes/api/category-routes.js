const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name']
      }
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  //find one Category by ID
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['category_id']
    }
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.post('/', (req, res) => {
  //Create a new Category
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.put('/:id', (req, res) => {
  //Updates a Category by ID
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if(!categoryData) {
      res.status(404).json({message: 'No Category found with that ID'});
      return
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  //Destroys a Category by ID
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({Message: 'No Category found with that ID'});
      return;
    }
    res.json(categoryData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

module.exports = router;
