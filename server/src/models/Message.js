module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Messages', {
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
    body: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    conversationId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Conversations',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  },
  );

  Message.associate = function (models) {
    Message.belongsTo(models.Users, { foreignKey: 'userId', sourceKey: 'id' });
    Message.belongsTo(models.Conversations, { foreignKey: 'conversationId', sourceKey: 'id' });
  };

  return Message;
};
