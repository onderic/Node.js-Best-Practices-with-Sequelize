const dotenv = require("dotenv");
const path = require("path");
const logger = require("../libraries/log/logger");
const dbConfig = require("./config.schema");  

class Config {
  constructor() {
    if (!Config.instance) {
      logger.info("Loading environment variables for the first time...");
      this.config = this.loadEnvVariables();
      Config.instance = this;
      logger.info("Environment variables loaded");
    }

    return Config.instance;
  }

  loadEnvVariables() {
    const environment = process.env.NODE_ENV || "development";

    // Load the environment file based on NODE_ENV
    const envFile = `.env.${environment}`;
    const envPath = path.join(__dirname, "..", envFile);
    
    dotenv.config({ path: envPath });

    const finalConfig = { ...dbConfig }; 
    return finalConfig;
  }

  static getInstance() {
    if (!Config.instance) {
      new Config();
    }
    return Config.instance;
  }
}

module.exports = Config.getInstance().config;
