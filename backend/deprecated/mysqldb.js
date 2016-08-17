/**
 * Created by KIMSEONHO on 16. 7. 25.
 * 일단 이렇게 이용한 후에,
 * 나중에 Sequelize로 교체해야겠다.
 */
var mysql = require('promise-mysql');
var pool = mysql.createPool({
    connectionLimit: 5,
    host : 'ankroom.moblab.kr',
    port : 3306,
    user : 'root',
    password : 'hitit113112',
    database : 'mydb'
});

exports.getRecords = function(city, callback) {
    var sql = "SELECT * FROM mydb.LOCALE_CODE;";
    // get a connection from the pool
    connection.query(sql, function (err,rows) {
        var row;
        row = rows;

        callback(false,row);
    });

    connection.release();
};

exports.getArticleList = function(start, count, callback) {
    var sql = "SELECT p.IDX_PK idx, u.IDX_PK user_idx, p.PHOTO_NAME, UPLOAD_TIME, COMMENT, GPS_LAT,GPS_LNG,ACCOUNT,LOCALE_CODE_FK FROM mydb.PHOTO p left join USER u on p.USER_FK = u.IDX_PK order by p.IDX_PK desc limit ?,?;";
    start = parseInt(start);
    count = parseInt(count);

    connection.query(sql,[start,count], function (err,rows) {
        //console.log(err);
        var row;
        row = rows;
        //console.log(row);
        callback(false,row);
    });

  connection.release();
};

exports.getArticle = function(idx, callback) {
    var sql = "SELECT * FROM PHOTO WHERE IDX_PK=?";
    // get a connection from the pool
    connection.query(sql,[idx], function (err,rows) {
        var row;
        row = rows;

        callback(false,row);
    });
  connection.release();
};

exports.getArticleWithUser = function(idx, callback) {
    var sql = "SELECT * FROM mydb.PHOTO left join USER on PHOTO.USER_FK = USER.IDX_PK where PHOTO.IDX_PK=?";
    // get a connection from the pool
    connection.query(sql,[idx], function (err,rows) {
        var row;
        row = rows;

        callback(false,row);
    });

  connection.release();
};

exports.setArticle = function(param, callback) {
    var sql = "INSERT INTO PHOTO (USER_FK, PHOTO_NAME, UPLOAD_TIME,COMMENT,GPS_LAT,GPS_LNG) VALUES (?, ?, ?, ?, ?, ?);";
    // get a connection from the pool
    connection.query(sql,param, function (err,rows) {
        var row;
        row = rows;
        callback(err,row);
    });

  connection.release();
};

/**
 * 해당 idx값에 대한 회원 정보 검색
 * @param idx
 * @returns Array[0] DB Error : -1, 검색 결과 없음 : 0}
 */
exports.getUserByIdx = function(idx, callback) {
  var sql = "SELECT * FROM Member WHERE IDX = ?";

  connection.query(sql,[idx], function (err, rows) {
    callback(err, rows);
    connection.release();
  });
};

/**
 * 해당 email값에 대한 회원 정보 검색
 * @param email
 */
exports.getUserByEmail = function(email, callback) {
  var sql = "SELECT * FROM Member WHERE IDX = ?";

  connection.query(sql,[email], function (err, rows) {
    callback(err, rows);
    connection.release();
  });
};

/**
 * 해당 email값 존재 여부 확인
 * @param email
 */
exports.isEmail = function(email, callback) {
  var sql = "SELECT COUNT(*) count EMAIL email IDX idx FROM Member WHERE EMAIL=?";

  connection.query(sql,[email], function (err, rows) {
    callback(err, rows);
    connection.release();
  });
};

/**
 * 기본 계정 생성
 * @param email
 * @param password
 * @param memberType
 * @param callback
 */
exports.createAccount = function(email, password, memberType, callback) {
    var sql = "INSERT INTO Member (EMAIL, PASSWORD, MEMBER_TYPE) VALUES (?, ?, ?);";

    connection.query(sql,[email, password, memberType], function (err, rows) {
      callback(err, rows);
      connection.release();
    });
};
