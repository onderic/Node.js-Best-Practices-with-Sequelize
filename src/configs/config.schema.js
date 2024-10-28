require('dotenv').config();


module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  DB: process.env.DB,                
  USER: process.env.DB_USER,        
  PASSWORD: process.env.DB_PASSWORD , 
  HOST: process.env.DB_HOST, 
  DIALECT: process.env.DB_DIALECT, 
  POOL: {
    max: parseInt(process.env.DB_POOL_MAX, 10) || 5, 
    min: parseInt(process.env.DB_POOL_MIN, 10) || 0, 
    acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10) || 30000, 
    idle: parseInt(process.env.DB_POOL_IDLE, 10) || 10000 
  },

  PORT: process.env.PORT,          
};
