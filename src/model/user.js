const Sequelize = require("sequelize");
const { mySequelize } = require("../config");

const User = mySequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    emailVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "email_verified",
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(50),
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: "users",
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        name: "users_email",
        fields: ["email"],
        where: {
          deletedAt: null,
        },
      },
    ],
  }
);

module.exports = User;
