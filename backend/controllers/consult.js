
"use strict";

const models = require('../models');
const Consult = models.UserConsultInfoBoard;
const _ = require('lodash');

var moment = require('moment');

exports.consultingCounsel = function(req, res) {

  const memberIdx = req.user.idx;

  const title = req.body.title; // 제목
  // acceptStatus
  const initWriteDate = Date.now(); // 작성 날짜
  const buildType = req.body.buildType; // 공사 구분
  const userName = req.body.userName; // 이름
  const telephone = req.body.telephone; // 연락처
  const email = req.body.email; // 이메일
  const expectBuildPrice = req.body.expectBuildPrice; // 공사예산
  const buildPlace = req.body.buildPlace; // 공사지 주소
  const lived = req.body.lived; // 거주 / 비거주
  const expectBuildTotalArea = req.body.expectBuildTotalArea; // 평수
  const expectBuildStartDate = moment(req.body.expectBuildStartDate).format('YYYY-MM-DD'); // 공사 시작 날짜
  const expectConsultDate = moment(req.body.expectConsultDate).format('YYYY-MM-DD'); // 상담 날짜
  const reqContents = req.body.reqContents; // 공사 요청사항

  // 변수 초기화
  let consult = {
    memberIdx: memberIdx,
    title: title,
    initWriteDate: initWriteDate,
    buildType: buildType,
    userName: userName,
    telephone: telephone,
    email: email,
    expectBuildPrice: expectBuildPrice,
    buildPlace: buildPlace,
    lived: lived,  //radion버튼
    expectBuildTotalArea: expectBuildTotalArea,
    expectBuildStartDate: expectBuildStartDate,
    expectConsultDate: expectConsultDate,
    reqContents: reqContents
  }

  // 값이 빈 경우 Error Message 출력
  if (!title) return res.status(400).send("제목을 입력해 주세요.");
  if (!buildType) return res.status(400).send("공사 구분을 선택해 주세요.");
  if (!userName) return res.status(400).send("이름을 입력해 주세요.");
  if (!telephone) return res.status(400).send("연락처를 선택해 주세요.");
  if (email.split("@")[0] == "") return res.status(400).send("이메일을 입력해 주세요.");
  if (!expectBuildPrice) return res.status(400).send("공사예산을 입력해 주세요.");
  if (!buildPlace) return res.status(400).send("공사지주소를 입력해 주세요.");
  if (!lived) return res.status(400).send("거주/비거주를 선택해 주세요.");
  if (!expectBuildTotalArea) return res.status(400).send("평수를 선택해 주세요.");
  if (expectBuildStartDate == "Invalid date") return res.status(400).send("공사예정일을 선택해 주세요.");
  if (expectConsultDate == "Invalid date") return res.status(400).send("상담희망일을 선택해 주세요.");
  if (!reqContents) return res.status(400).send("공사요청사항을 입력해 주세요."); 

  // 값이 올바른 형식인지 체크 (정규표현식 이용)

  // 연락처
  if (!telephone.match(/^\d{3}-\d{3,4}-\d{4}$/)) return res.status(400).send("올바른 연락처를 입력해 주세요."); 
  // 이메일
  if (!email.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)) return res.status(400).send("올바른 이메일을 입력해 주세요."); 
  // 예산
  if (!expectBuildPrice.match(/^[0-9]+$/)) return res.status(400).send("올바른 예산을 입력해 주세요.");
  // 평수
  if (!expectBuildTotalArea.match(/^[0-9]+$/)) return res.status(400).send("올바른 평수를 입력해 주세요.");

  return Consult.create(consult).then(function(consultData) {
    return res.status(201).json({
      status: 1
    });
  }).catch(function(err) {
    return res.status(400).send("Err"); // DB Insert Error
  });
}

exports.consultingModify = function(req, res) {

  const idx = req.params.consultDataIdx;

  const memberIdx = req.user.idx;

  const title = req.body.title;
  // acceptStatus
  const buildType = req.body.buildType;
  const userName = req.body.userName;
  const telephone = req.body.telephone;
  const email = req.body.email;
  const expectBuildPrice = req.body.expectBuildPrice;
  const buildPlace = req.body.buildPlace;
  const lived = req.body.lived; //radio버튼
  const expectBuildTotalArea = req.body.expectBuildTotalArea;
  const expectBuildStartDate = moment(req.body.expectBuildStartDate).format('YYYY-MM-DD');
  const expectConsultDate = moment(req.body.expectConsultDate).format('YYYY-MM-DD');
  const reqContents = req.body.reqContents;

  let consult = { };

  // 수정될 정보를 정리
  // 값이 비어있을 경우 수정안함으로 판단하여 값을 변경하지 않음.
  consult['memberIdx'] = memberIdx;
  if (title) consult['title'] = title;
  if (buildType) consult['buildType'] = buildType;
  if (userName) consult['userName'] = userName;
  if (telephone) consult['telephone'] = telephone;
  if (email.split("@")[0] != "") consult['email'] = email;
  if (expectBuildPrice) consult['expectBuildPrice'] = expectBuildPrice;
  if (buildPlace) consult['buildPlace'] = buildPlace;
  if (lived) consult['lived'] = lived; //radio버튼
  if (expectBuildTotalArea) consult['expectBuildTotalArea'] = expectBuildTotalArea;
  if (expectBuildStartDate && expectBuildStartDate != "Invalid date") consult['expectBuildStartDate'] = expectBuildStartDate;
  if (expectConsultDate && expectConsultDate != "Invalid date") consult['expectConsultDate'] = expectConsultDate;
  if (reqContents) consult['reqContents'] = reqContents;

  // 값이 존재할 경우 올바른 형식인지 체크 (정규표현식 이용)

  // 연락처
  if (telephone && !telephone.match(/^\d{3}-\d{3,4}-\d{4}$/)) return res.status(400).send("올바른 연락처를 입력해 주세요."); 
  // 이메일
  if (email.split("@")[0] != "" && !email.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)) return res.status(400).send("올바른 이메일을 입력해 주세요."); 
  // 예산
  if (expectBuildPrice && !expectBuildPrice.match(/^[0-9]+$/)) return res.status(400).send("올바른 예산을 입력해 주세요.");
  // 평수
  if (expectBuildTotalArea && !expectBuildTotalArea.match(/^[0-9]+$/)) return res.status(400).send("올바른 평수를 입력해 주세요.");

  // 값이 기존에 존재하는지 판단
  return Consult.findOne({
    where: {
      idx: idx
    }
  }).then(function(result) {
    if (result) {
      // 회원 IDX비교하여
      // 자신의 정보만 수정 가능하도록함
      if (result.memberIdx != req.user.idx) {
        return res.status(400).send("다른 회원정보");
      }

      // DB Update Query
      return Consult.update(consult, {
        where: {
          idx: idx
        }
      }).then(function(consultData) { // 값이 정상적으로 변경됨
        return res.status(201).json({
          status: 1
        });
      }).catch(function(err) { // DB update error
        return res.status(400).send("Update Error");
      });
    } else { // 값이 존재하지 않음
      return res.status(400).send("정보를 찾을수 없음");
    }
  }).catch(function(err) { // DB select error
    return res.status(400).send("DB Error");
  });
}

// 전체 컨설팅 목록
exports.consultingList = function(req, res) {
  let pageSize, pageStartIndex;

  // 페이지 정보 확인
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
    limit: pageSize, // 페이지 크기
    offset: pageStartIndex // 시작 번호(문서)
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

// 자신의 컨설팅 목록
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

// 컨설팅 세부 정보
exports.consultingDetail = function(req, res) {

  const consultDataIdx = req.params.consultDataIdx;

  return Consult.findOne({
    where: {
      idx: consultDataIdx
    }
  }).then(function(consult) { // 다른 회원의 내용일 경우 열람 불가능
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
