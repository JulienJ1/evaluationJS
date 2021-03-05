const Cat = require('../models/cat.model');

exports.findAll = async (req, res) => {
  try {
    const cat = await Cat.findAll();
    return res.send(cat);
  } catch (err) {
    console.error(`Error in Cat - findAll : ${err}`);
    return res.status(500)
      .send({
        message:
          err?.message || 'Some error occurred while retrieving Cat.',
      });
  }
};

exports.findOne = async (req, res) => {
  try {
    const cat = await Cat.findById(+req.params.id);
    if (cat.isEmpty) {
      return res.status(404)
        .send({ message: `Not found Cat with id : ${req.params.id}.` });
    }
    return res.send(cat);
  } catch (err) {
    console.error(`Error in Cat - findOne : ${err}`);
    return res.status(500)
      .send({
        message:
          err?.message || 'Some error occurred while retrieving Cat.',
      });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400)
        .send({ message: 'La requête ne peut pas être vide' });
    }
    const cat = new Cat(req.body);
    const newcat = await Cat.create(cat);
    return res.send(newcat);
  } catch (err) {
    console.error(`Error in Cat - create : ${err}`);
    return res.status(500)
      .send({
        message:
          err?.message || 'Some error occurred while retrieving Cat.',
      });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400)
        .send({ message: 'La requête ne peut pas être vide' });
    }
    const cat = new Cat(req.body);
    const updatecat = await Cat.updateById(+req.params.id, cat);
    if (updatecat.isFound) {
      return res.status(404)
        .send({ message: `Cat not found with id : ${req.params.id}` });
    }
    return res.send(updatecat);
  } catch (err) {
    console.error(`Error in Cat - update : ${err}`);
    return res.status(500)
      .send({
        message:
          err?.message || 'Some error occurred while retrieving Cat.',
      });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedcat = await Cat.remove(+req.params.id);
    if (deletedcat.isFound) {
      return res.status(404)
        .send({ message: `Cat not found with id : ${req.params.id}` });
    }
    return res.send(deletedcat);
  } catch (err) {
    console.error(`Error in Cat - delete : ${err}`);
    return res.status(500)
      .send({
        message:
          err?.message || 'Some error occurred while retrieving Cat.',
      });
  }
};
