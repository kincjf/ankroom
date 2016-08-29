/**
 * Created by KIMSEONHO on 2016-08-27.
 */
var Enum = require('enum');
/**
 * 전송 완료시의 상태코드
 */
const statusCode = new Enum({
  'RequestActionCompleted_20x': 1
});

const memberType = new Enum({
  'Admin': 0,
  'PublicMember': 1,
  'BusinessMember': 2
});

const uploadPath = {

};


module.exports = {
  statusCode,
  memberType,
  uploadPath
};
