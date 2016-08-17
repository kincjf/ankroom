'use strict';

var Umzug = require('umzug');
var Bluebird = require('bluebird');

function getMigrator(db) {
    var Sequelize = db.Sequelize;
    var sequelize = db.sequelize;
    var migrator = new Umzug({
        storage: 'sequelize',
        storageOptions: {
            sequelize: sequelize,
            tableName: 'migrations'
        },
        logging: console.log,
        migrations: {
            params: [ sequelize.getQueryInterface(), Sequelize ],
            path: process.cwd() + '/migrations',
            pattern: /^\d+[\w-]+\.js$/,
            wrap: function (fun) {
                if (fun.length === 3) {
                    return Bluebird.promisify(fun);
                } else {
                    return fun;
                }
            }
        }
    });

    // Convert `Bluebird` promise to native `Promise` for `finally()`
    return new Promise(function(resolve, reject) {
        sequelize.authenticate().then(function () {
            resolve(migrator);
        }, function(err) {
            reject(err);
        });
    });
}

module.exports = {
    getMigrator: getMigrator
};