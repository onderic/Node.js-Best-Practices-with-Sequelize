const { baseModelFields } = require('../../libraries/db/baseModel');

module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('Product', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    inStock: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    ...baseModelFields
  });

  Product.associate = (models) => {
    // Define associations here if needed
  };

  return Product;
};
