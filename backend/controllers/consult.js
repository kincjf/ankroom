
"use strict";

const models = require('../models');
const Consult = models.UserConsultInfoBoard;
const _ = require('lodash');

var moment = require('moment');

exports.consultingCounsel = function(req, res) {

  const memberIdx = req.user.idx;

  const title = req.body.title;
  // acceptStatus
  const initWriteDate = Date.now();
  const prefBizMemberIdx = req.body.prefBizMemberIdx;
  const buildType = req.body.buildType;
  const prefBuildCaseInfoIdx = req.body.prefBuildCaseInfoIdx;
  const userName = req.body.userName;
  const telephone = req.body.telephone;
  const email = req.body.email;
  const expectBuildPrice = req.body.expectBuildPrice;
  const buildPlace = req.body.buildPlace;
  const lived = req.body.lived;
  const expectBuildTotalArea = req.body.expectBuildTotalArea;
  const expectBuildStartDate = moment(req.body.expectBuildStartDate).format('YYYY-MM-DD');
  const expectConsultDate = moment(new Date(parseInt(req.body.expectConsultDate) * 1000)).format();
  const reqContents = req.body.reqContents;

  let consult = {
    // idx: auto increment
    memberIdx: memberIdx,
    title: title,
//    acceptStatus: 0, //?? 어디잇는 값?
    initWriteDate: initWriteDate,
//    prefBizMemberIdx: prefBizMemberIdx, //null값으로
    buildType: buildType,
//    prefBuildCaseInfoIdx: prefBuildCaseInfoIdx, //null값으로로    userName: userName,
    telephone: telephone,
    email: email,
    expectBuildPrice: expectBuildPrice,
    buildPlace: buildPlace,
//    lived: lived,  radion버튼
    expectBuildTotalArea: expectBuildTotalArea,
    expectBuildStartDate: expectBuildStartDate,
    expectConsultDate: expectConsultDate,
    reqContents: reqContents
  }

  return Consult.create(consult).then(function(consultData) {
    return res.status(201).json({
      status: 1
    });
  }).catch(function(err) {
    return res.status(400).send("Err");
  });
}

exports.consultingModify = function(req, res) {

  const idx = req.params.consultDataIdx;

  const memberIdx = req.user.idx;

  const title = req.body.title;
  // acceptStatus
  //const initWriteDate = Date.now();
  //const prefBizMemberIdx = req.body.prefBizMemberIdx;
  const buildType = req.body.buildType;
  //const prefBuildCaseInfoIdx = req.body.prefBuildCaseInfoIdx;
  const userName = req.body.userName;
  const telephone = req.body.telephone;
  const email = req.body.email;
  const expectBuildPrice = req.body.expectBuildPrice;
  const buildPlace = req.body.buildPlace;
  //const lived = req.body.lived; //radio버튼
  const expectBuildTotalArea = req.body.expectBuildTotalArea;
  const expectBuildStartDate = moment(req.body.expectBuildStartDate).format('YYYY-MM-DD');
  const expectConsultDate = moment(new Date(parseInt(req.body.expectConsultDate) * 1000)).format();
  const reqContents = req.body.reqContents;

  let consult = { };

  consult['memberIdx'] = memberIdx;
  if (title) consult['title'] = title;
  //if (acceptStatus) consult['acceptStatus'] = acceptStatus;
  //if (prefBizMemberIdx) consult['prefBizMemberIdx'] = prefBizMemberIdx;
  if (buildType) consult['buildType'] = buildType;
  //if (prefBuildCaseInfoIdx) consult['prefBuildCaseInfoIdx'] = prefBuildCaseInfoIdx;
  if (userName) consult['userName'] = userName;
  if (telephone) consult['telephone'] = telephone;
  if (email) consult['email'] = email;
  if (expectBuildPrice) consult['expectBuildPrice'] = expectBuildPrice;
  if (buildPlace) consult['buildPlace'] = buildPlace;
  //if (lived) consult['lived'] = lived; //radio버튼
  if (expectBuildTotalArea) consult['expectBuildTotalArea'] = expectBuildTotalArea;
  if (expectBuildStartDate && expectBuildStartDate != "Invalid date") consult['expectBuildStartDate'] = expectBuildStartDate;
  if (expectConsultDate && expectConsultDate != "Invalid date") consult['expectConsultDate'] = expectConsultDate;
  if (reqContents) consult['reqContents'] = reqContents;

  return Consult.findOne({
    where: {
      idx: idx
    }
  }).then(function(result) {
    if (result) {
      if (result.memberIdx != req.user.idx) {
        return res.status(400).send("다른 회원정보");
      }

      return Consult.update(consult, {
        where: {
          idx: idx
        }
      }).then(function(consultData) {
        return res.status(201).json({
          status: 1
        });
      }).catch(function(err) { // update error
        return res.status(400).send("Update Error");
      });
    } else {
      return res.status(400).send("정보를 찾을수 없음");
    }
  }).catch(function(err) { // select error
    return res.status(400).send("DB Error");
  });


/*
  Consult.findOne().then(function(result) {
    console.log(result);
  });
*/
}

exports.consultingList = function(req, res) {
  let pageSize, pageStartIndex;

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
  return Consult.findAll({
    limit: pageSize,
    offset: pageStartIndex
  }).then(function(consultList) {
    return res.status(200).json({ Consult: consultList, statusCode: 1 });
  }).catch(function(err) {
    if (err) {
      return res.status(400).json({
        errorMsg: '정보 없음',
        statusCode: -1
      });
    }
  });
}

exports.consultingMyList = function(req, res) {
  let pageSize, pageStartIndex;
  const userIdx = req.user.idx;

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
  return Consult.findAll({
    where: {
      memberIdx: userIdx
    },
    limit: pageSize,
    offset: pageStartIndex
  }).then(function(consultList) {
    return res.status(200).json({ Consult: consultList, statusCode: 1 });
  }).catch(function(err) {
    if (err) {
      return res.status(400).json({
        errorMsg: '정보 없음',
        statusCode: -1
      });
    }
  });
}

exports.consultingDetail = function(req, res) {

  const consultDataIdx = req.params.consultDataIdx;

  return Consult.findOne({
    where: {
      idx: consultDataIdx
    }
  }).then(function(consult) {
    if (req.user.idx != consult.memberIdx) {
      return res.status(400).send("다른 회원");
    }

    return res.status(200).json({ consult, statusCode: 1 });
  }).catch(function(err) {
    if (err) {
      return res.status(400).json({
        errorMsg: '정보 없음',
        statusCode: -1
      });
    }
  });
}
