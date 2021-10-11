module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      participants: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      blackList: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
      },
      favoriteList: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Conversations');
  },
};
