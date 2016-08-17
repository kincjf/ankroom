/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BusinessMember', {
    memberIdx: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Member',
        key: 'idx'
      }
    },
    companyName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    ownerName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    bizRegNo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    workPlace: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING(200),
      allowNull: false
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
