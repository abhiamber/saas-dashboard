'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Widgets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dashboardId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Dashboards",  // 🔗 MUST MATCH Dashboard TABLE NAME
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      config: {
        type: Sequelize.JSON,
        allowNull: true,
      },

      // Timestamps (if needed)
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Widgets');
  }
};
