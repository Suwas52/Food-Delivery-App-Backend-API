const sequelize = require("sequelize");
require("dotenv").config();

const mySequelize = new sequelize.Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    timezone: "utc",
    define: {
      timestamps: true,
      createdAt: true,
      updatedAt: true,
    },
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await mySequelize.authenticate();
    console.info(`postgres db connected`);
  } catch (error) {
    console.error(error.message);
    return error;
  }
};

module.exports = { connectDB,mySequelize };
