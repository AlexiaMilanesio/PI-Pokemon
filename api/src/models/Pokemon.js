const { DataTypes } = require("sequelize");

// Exportamos una función que define el modelo y luego le injectamos la conexión a sequelize
module.exports = (sequelize) => {
  sequelize.define("pokemon", 
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      notNull: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      notNull: true,
      validate: {
        // is: /^[a-z]+$/i,
        isAlpha: true, 
      },        
    },
    hp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
        max: 200
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
        max: 200
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
        max: 200
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
        max: 200
      }
    },
    height: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
        max: 200
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
        max: 1000
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true, 
      }
    },
  },
  { timestamps: false }
  );
};
