/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BuildCaseInfoBoard', {
    idx: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    memberIdx: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Member',
        key: 'idx'
      }
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    buildType: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    buildPlace: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    buildTotalArea: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    mainPreviewImage: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    buildTotalPrice: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    HTMLText: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    VRImages: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    initWriteDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.NOW
    }
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    tableName: 'BuildCaseInfoBoard'
  });
};
