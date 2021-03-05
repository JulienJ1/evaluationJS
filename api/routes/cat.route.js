const controller = require('../controllers/cat.controller');

module.exports = (app) => {
  app.get('/api/cat', controller.findAll);

  app.get('/api/cat/:id', controller.findOne);

  app.post('/api/cat', controller.create);

  app.put('/api/cat/:id', controller.update);

  app.delete('/api/cat/:id', controller.delete);
};
