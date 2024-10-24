const express = require('express');
const logger = require('../../libraries/log/logger');
const { AppError } = require('../../libraries/error-handling/AppError');

const {
  createProduct,
  getAllProducts,
} = require('./service');

const { createSchema } = require('./request');
const { validateRequest } = require('../../libraries/middlewares/request-validate');
const { logRequest } = require('../../libraries/middlewares/log');

const model = 'Product';

const routes = () => {
  const router = express.Router();
  logger.info(`Setting up routes for ${model}`);

  router.post(
    '/',
    logRequest({}),
    validateRequest({ schema: createSchema }),
    async (req, res, next) => {
      try {
        const item = await createProduct(req.body); 
        res.status(201).json(item); 
      } catch (error) {
        next(error); 
      }
    }
  );

  router.get('/', logRequest({}), async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 4; 
      const offset = parseInt(req.query.offset) || 0; 
      const { products, totalCount } = await getAllProducts(limit, offset);
      res.json({totalCount,  products });
    } catch (error) {
      next(error);
    }
  });

  return router;
};

module.exports = { routes };
