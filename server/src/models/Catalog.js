

module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define('Catalogs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    catalogName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    chats: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
  },
  {
    timestamps: false,
  },
  );

  Catalog.associate = function (models) {
    Catalog.belongsTo(models.Users, { foreignKey: 'userId', sourceKey: 'id' });
  };

  return Catalog;
};
