const { DataTypes } = require("sequelize");

// Exportamos una función que define el modelo y luego le injectamos la conexión a sequelize
module.exports = (sequelize) => {
  sequelize.define("type", 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      notNull: true,
      validate: {
        isNumeric: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        // is: /^[a-z]+$/i,
        isAlpha: true, 
      },  
    },
  },
  { timestamps: false }
  );
};
