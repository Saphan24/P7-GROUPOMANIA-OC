'use strict';
const { Model } = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/dist/lib/query-types');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: { 
      type: DataTypes.INTEGER,
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