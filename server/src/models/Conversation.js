module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    participants: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    blackList: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
    },
    favoriteList: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
    },
  },
  {
    timestamps: true,
  },
  );

  Conversation.associate = function (models) {
    Conversation.hasMany(models.Messages, { foreignKey: 'conversationId', targetKey: 'id' });
  };

  return Conversation;
};
