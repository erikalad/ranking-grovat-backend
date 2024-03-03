const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Ranking = sequelize.define('ranking', {
    id_demo: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    fechaAgenda: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaDemo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    setter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Ranking;
};
