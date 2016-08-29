/**
 * Created by KIMSEONHO on 2016-08-27.
 */
"use strict";

const _ = require('lodash');
const multer = require('multer');
// var fsp = require('fs-promise');

const genToken = require('../utils/genToken');
const staticValue = require('../utils/staticValue');
const models = require('../models');
const Member = models.Member;
const BuildCaseInfoBoard = models.BuildCaseInfoBoard;

//========================================
// Build Case Routes
//========================================
// 시공 사례 리스트 조회
exports.viewBuildCaseList = function(req, res, next) {
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
  BuildCaseInfoBoard.findAll({
    limit: pageSize,
    offset: pageStartIndex
  }).then(function(buildCases) {
    res.status(200).json({ buildCaseInfo: buildCases, statusCode: 1 });
    return next();
  }).catch(function(err) {
    if (err) {
      res.status(400).json({
        errorMsg: 'No BuildCase could be found for pageSize, pageStartIndex.',
        statusCode: 2
      });
      return next(err);
    }
  });
}

// 시공 사례 입력
exports.createBuildCase = function(req, res, next) {
  if (req.user.memberType != staticValue.memberType.BusinessMember) {
    return res.status(401).json({
      errorMsg: 'You are not authorized to create build case.',
      statusCode: 2
    });
  }

  if (!req.body.title) {
    return res.status(401).json({
      errorMsg: 'You must enter an required field! please check title',
      statusCode: -1
    });
  }

  let previewImagePath;
  if (req.files['previewImage']) {
    // const previewImagePath = req.files['prewviewImage'][0].originalname;
    previewImagePath = req.files['previewImage'][0].name;
  }

  let vrImagePath;
  if (req.files['vrImage']) {
    vrImagePath = [];

    _forEach(req.files['vrImage'], function(file, key) {
      if(file) {
        vrImagePath.push(file.name);
      }
    });
  }

  const buildCase = {
    memberIdx: req.user.idx,
    title: req.body.title,
    buildType: req.body.buildType == "" ? null : req.body.buildType,
    buildPlace: req.body.buildPlace == "" ? null : req.body.buildPlace,
    buildTotalArea: req.body.buildTotalArea == "" ? null : _.toNumber(req.body.buildTotalArea),
    mainPreviewImage: _.isNil(previewImagePath) ? null : previewImagePath,
    buildTotalPrice: req.body.buildTotalPrice == "" ? null : _.toNumber(req.body.buildTotalPrice),
    HTMLText: req.body.HTMLText == "" ? null : req.body.HTMLText,
    VRImages: _.isNil(vrImagePath) ? null : JSON.stringify(vrImagePath)
  }

  BuildCaseInfoBoard.create(buildCase).then(function(newBuildCase) {
    return res.status(201).json({
      buildCaseInfo: newBuildCase,
      statusCode: staticValue.statusCode.RequestActionCompleted_20x
    });
  }).catch(function(err) {
    if (err) {
      res.status(400).json({
        errorMsg: 'BuildCaseInfoBoard Error : No user could be found for this ID.',
        statusCode: 2
      });
      return next(err);
    }
  });
}

// 시공 사례 수정
// 파일이 중복으로 첨부되었을 경우, 중복 처리를 통해서 업로드 되지 않게 한다.
// multer({fileFilter})를 이용하기.
exports.updateBuildCase = function(req, res, next) {
  // const userId = _.toNumber(req.params.memberIdx);
  //
  // if (req.user.idx != userId) {
  //   return res.status(401).json({
  //     errorMsg: 'You are not authorized to view this user profile.',
  //     statusCode: 2
  //   });
  // }
  //
  // if (!req.body.email || !req.body.password) {
  //   return res.status(401).json({
  //     errorMsg: 'You must enter an required field! please check email, password',
  //     statusCode: -1
  //   });
  // }
  //
  // const current = {
  //   email: req.user.email,
  //   password: req.user.passwordOrigin,
  //   telephone: req.user.telephone
  // }
  //
  // // 공백으로 넘어올 때 에러처리하자!
  // const changes = {
  //   email: req.body.email,
  //   password: req.body.password,
  //   telephone: req.body.telephone
  // };
  //
  // // return Array[0] = affectedRows
  // Member.update(changes, {where: { idx: userId }}).then(function(array) {
  //   if(array[0] == 1) {   // 변경 된 경우
  //     // email, pwd이 바뀐 경우
  //     if(!_.eq(current.email, changes.email) || !_.eq(current.password, changes.password)) {
  //       // 재로그인을 위하여 다음 middleware(passport - LocalStrategy)로 email, password값을 넘겨줌
  //       // 사실 안 적어도 되는데, 체크하는 측면에서 적음. 나중에 잘 작동되면 지워도 됨
  //       req.body.email = changes.email;
  //       req.body.password = changes.password;
  //
  //       return next();
  //     } else {    // 바뀌지 않거나, 전화번호만 바뀌었을 경우
  //       return res.status(200).json({
  //         msg: 'changed only telephone',
  //         statusCode: 0
  //       });
  //     }
  //   }
  //
  //   res.status(200).json({
  //     msg: 'No changes',
  //     statusCode: 0
  //   });
  //
  //   return next("route");   // 다른 callback은 무시함.
  // }).catch(function(err) {
  //   if (err) {
  //     res.status(400).json({
  //       errorMsg: 'No user could be found for this ID.',
  //       statusCode: 2
  //     });
  //     return next(err);
  //   }
  // });
}


// 시공사례 상세보기
exports.viewBuildCase = function(req, res, next) {
  // const userId = _.toNumber(req.params.memberIdx);
  //
  // if ((req.user.idx != userId) || (req.user.memberType != BIZMEMBER)) {
  //   return res.status(401).json({
  //     errorMsg: 'You are not authorized to view this user profile.',
  //     statusCode: 2
  //   });
  // }
  //
  // BusinessMember.findById(userId).then(function(user) {
  //   res.status(200).json({ bizUserInfo: user, statusCode: 1 });
  //   return next();
  // }).catch(function(err) {
  //   if (err) {
  //     res.status(400).json({
  //       errorMsg: 'No user could be found for this ID.',
  //       statusCode: -1
  //     });
  //     return next(err);
  //   }
  // });
}

// 시공사례 검색(2)
exports.searchBuildCase = function(req, res, next) {
  // const userId = _.toNumber(req.params.memberIdx);
  //
  // if ((req.user.idx != userId) || (req.user.memberType != BIZMEMBER)) {
  //   return res.status(401).json({
  //     errorMsg: 'You are not authorized to view this user profile.',
  //     statusCode: 2
  //   });
  // }
  //
  // BusinessMember.findById(userId).then(function(user) {
  //   res.status(200).json({ bizUserInfo: user, statusCode: 1 });
  //   return next();
  // }).catch(function(err) {
  //   if (err) {
  //     res.status(400).json({
  //       errorMsg: 'No user could be found for this ID.',
  //       statusCode: -1
  //     });
  //     return next(err);
  //   }
  // });
}

// 시공사례 삭제(3)
exports.deleteBuildCase = function(req, res, next) {
  // const userId = _.toNumber(req.params.memberIdx);
  //
  // if ((req.user.idx != userId) || (req.user.memberType != BIZMEMBER)) {
  //   return res.status(401).json({
  //     errorMsg: 'You are not authorized to view this user profile.',
  //     statusCode: 2
  //   });
  // }
  //
  // BusinessMember.findById(userId).then(function(user) {
  //   res.status(200).json({ bizUserInfo: user, statusCode: 1 });
  //   return next();
  // }).catch(function(err) {
  //   if (err) {
  //     res.status(400).json({
  //       errorMsg: 'No user could be found for this ID.',
  //       statusCode: -1
  //     });
  //     return next(err);
  //   }
  // });
}
