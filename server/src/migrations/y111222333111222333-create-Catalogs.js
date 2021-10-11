module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Catalogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      catalogName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      chats: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Catalogs');
  },
};
