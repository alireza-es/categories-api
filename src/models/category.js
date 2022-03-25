module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      parent_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );
  Category.associate = function (models) {
    models.Category.hasMany(models.Category, {
      foreignKey: 'parent_id',
      sourceKey: 'id',
      as: 'children',
    });
    models.Category.belongsTo(models.Category, {
      foreignKey: 'parent_id',
      sourceKey: 'id',
      as: 'parent',
    });
  };

  return Category;
};
