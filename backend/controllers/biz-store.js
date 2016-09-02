/**
 * Created by KIMSEONHO on 2016-09-02.
 */
const _ = require('lodash');
const genToken = require('../utils/genToken');

const models = require('../models');
const BusinessMember = models.BusinessMember;

/**
 * 업체 정보 목록 조회
 * 일단 다 리턴하고 나중에 추스려서 리턴하자
 * @param req
 * @param res
 * @param next
 */
exports.viewBizProfileList = function(req, res, next) {
  var pageSize, pageStartIndex;

  if (!req.query.pageSize || !req.query.pageStartIndex) {
    // query가 제대로 오지 않으면 초기값으로 보낸다.
    pageSize = 10;
    pageStartIndex = 0;
  } else {
    pageSize = _.toNumber(req.query.pageSize);
    pageStartIndex = _.toNumber(req.query.pageStartIndex);
  }

  // ex> pageSize가 10이고, pageStartIndex가 10이면
  // return 데이터(Index 기준)는 10~19, 총 10개이다.
  BusinessMember.findAll({
    limit: pageSize,
    offset: pageStartIndex
  }).then(function(bizUserInfos) {
    return res.status(200).json({ bizUserInfo: bizUserInfos, statusCode: 1 });
  }).catch(function(err) {
    if (err) {
      return res.status(400).json({
        errorMsg: 'No BusinessMember could be found for pageSize, pageStartIndex.',
        statusCode: -1
      });
    }
  });
}


/**
 * 업체 정보 상세보기
 * 일단 다 리턴하고 나중에 추스리자
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.viewBizProfile = function(req, res, next) {
  const userId = _.toNumber(req.params.memberIdx);

  BusinessMember.findById(userId).then(function(user) {
    return res.status(200).json({ bizUserInfo: user, statusCode: 1 });
  }).catch(function(err) {
    if (err) {
      return res.status(400).json({
        errorMsg: 'No user could be found for this ID.',
        statusCode: -1
      });
    }

    return next();
  });
}
