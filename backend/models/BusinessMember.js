/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BusinessMember', {
    memberIdx: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Member',
        key: 'idx'
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    companyName: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ownerName: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    bizRegNo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    workPlace: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    mainWorkField: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    mainWorkArea: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    aboutCompanyShort: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    aboutCompany: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    companyLogo: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    companyIntroImage: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    tableName: 'BusinessMember'
  });
};
