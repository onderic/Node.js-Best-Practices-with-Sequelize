const { baseModelFields } = require('../../libraries/db/baseModel');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM('user', 'admin'),
        defaultValue: 'user',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      ...baseModelFields
    });
  
    User.associate = (models) => {
      // Define any associations if necessary
      // For example, if users have orders, you could define an association like:
      // User.hasMany(models.Order);
    };
  
    return User;
  };
  