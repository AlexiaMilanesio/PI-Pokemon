const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo y luego le injectamos la conexión a sequelize
module.exports = (sequelize) => {
  // Model definition
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
        max: 999
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
        max: 999
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
        max: 999
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
        max: 999
      }
    },
    height: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
        max: 999
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
        max: 999
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
