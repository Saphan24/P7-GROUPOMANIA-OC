'use strict';
const { Model } = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/dist/lib/query-types');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE'
      });
    }
  };
  Comment.init({
    userId: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: { 
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};