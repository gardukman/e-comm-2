const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags - include associated product data
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    include: {model: Product}
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id` - include associated product data
  Tag.findOne({
    attributes: [
      'id',
      'tag_name'
    ],
    include: {
      model: Product
    }
  })
  .then(dbTagData => {
    if(!dbTagData){
      res.status(404).json({ message: "Not a tag" });
      return
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.post('/', (req, res) => {
  // creates new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err=>{
    console.Console(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // updates tag's name via `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if(!dbTagData){
      res.status(404).json({ message: "Not a tag" });
      return
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.delete('/:id', (req, res) => {
  // deletes tag via `id` value
  Tag.destroy({ 
    where:{
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if(!dbTagData){
      res.status(404).json({ message: "Not a tag" });
      return
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

module.exports = router;
