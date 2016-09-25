/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserConsultInfoBoard', {
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
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    acceptStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    initWriteDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.NOW
    },
    prefBizMemberIdx: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'BusinessMember',
        key: 'memberIdx'
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    },
    buildType: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    prefBuildCaseInfoIdx: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'BuildCaseInfoBoard',
        key: 'idx'
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    },
    userName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    expectBuildPrice: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    buildPlace: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    lived: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    expectBuildTotalArea: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    expectBuildStartDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expectConsultDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reqContents: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    tableName: 'UserConsultInfoBoard'
  });
};
