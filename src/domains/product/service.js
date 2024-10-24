const logger = require('../../libraries/log/logger');
const { AppError } = require('../../libraries/error-handling/AppError');
const db = require("../../libraries/db");
const Product = db.Product;

const model = 'product';

/**
 * Service to create a new product
 */
const createProduct = async (data) => {
  try {
    const product = await Product.create(data);
    logger.info(`create(): ${model} created`, {
      id: product._id,
    });
    return product;
  } catch (error) {
    logger.error(`create(): Failed to create ${model}`, error);
    throw new AppError(`Failed to create ${model}`, error.message);
  }
};

/**
 * Service to get all products
 */
const getAllProducts = async (limit, offset) => {
  try {
    const products = await Product.findAll({
      limit: limit,
      offset: offset,
    });

    const totalCount = await Product.count();

    logger.info(`getAll(): Fetched all products`);
    return { products, totalCount }; 
  } catch (error) {
    logger.error(`getAll(): Failed to fetch products`, error);
    throw new AppError(`Failed to fetch products`, error.message);
  }
};

module.exports = { createProduct, getAllProducts };
