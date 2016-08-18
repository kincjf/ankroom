/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserSelectedBuildCaseBasket', {
    memberIdx: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Member',
        key: 'idx'
      }
    },
    buildCaseInfoIdx: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'BuildCaseInfoBoard',
        key: 'idx'
      }
    }
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    tableName: 'UserSelectedBuildCaseBasket'
  });
};
