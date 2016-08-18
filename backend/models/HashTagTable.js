/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HashTagTable', {
    hashTag: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    }
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    tableName: 'HashTagTable'
  });
};
