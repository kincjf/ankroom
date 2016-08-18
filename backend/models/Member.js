/* jshint indent: 2 */
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
// const _ = require('lodash');

module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define('Member', {
    idx: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    memberType: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    initRegDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.NOW
    },
    reqDropDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    resetPasswordToken: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    resetPasswordExpires: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    }
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    tableName: 'Member',
    instanceMethods: {
      // Method to compare password for login
      // instance level에서 접근을 해야 this 사용이 가능함.
      /**
       *
       * @param candidatePassword data to compare
       * @param cb callback
       */
      comparePassword: function(candidatePassword, cb) {
        var self = this;
        //bcrypt.compare(data, encrypted, cb)
        // data - [REQUIRED] - data to compare.
        //  encrypted - [REQUIRED] - data to be compared to.
        //  callback - [REQUIRED] - a callback to be fired once the data has been compared.
        //   error - First parameter to the callback detailing any errors.
        //   result - Second parameter to the callback providing whether the data and encrypted forms match [true | false].
        bcrypt.compareAsync(candidatePassword, self.password).then(function(isMatch) {
          return cb(null, isMatch);
        }).catch(function(err) {
          if (err) {
            return cb(err);
          }
        });
      }
    },
    hooks: {
      beforeValidate: function(member, options) {
        const SALT_FACTOR = 5;

        if (!member.changed('password')) {
          return sequelize.Promise.reject("not modified");
        }

        // bcrypt가 async이기 때문에 promise
        return bcrypt.genSaltAsync(SALT_FACTOR).then(function(salt) {
          return bcrypt.hashAsync(member.password, salt, null);
        }).then(function(hash) {
          member.setDataValue('password', hash);
        }).catch(function(err) {
          return sequelize.Promise.reject(err);
        });
      }
    }
  });

  return Member;
};
