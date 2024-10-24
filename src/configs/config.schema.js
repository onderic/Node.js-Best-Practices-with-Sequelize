module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  DB: process.env.DB || "node1",                
  USER: process.env.DB_USER || "node1",        
  PASSWORD: process.env.DB_PASSWORD || "0909", 
  HOST: process.env.DB_HOST || "localhost", 
  DIALECT: process.env.DB_DIALECT || "mysql", 
  PORT: process.env.PORT || 4000,          
  POOL: {
    max: parseInt(process.env.DB_POOL_MAX, 10) || 5, 
    min: parseInt(process.env.DB_POOL_MIN, 10) || 0, 
    acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10) || 30000, 
    idle: parseInt(process.env.DB_POOL_IDLE, 10) || 10000 
  }
};
