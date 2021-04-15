// testDB.json 데이터 작업 라이브러리. [상태코드, 데이터] 값으로 통일함.

// add 작업을 하고 완료된 데이터를 return 한다.
export const AddHoldy = function (holidayList, {begDt, holdyTpCd, holdyNm, createdAt, createdBy}) {
  let nextHolidayList = [...holidayList]
  let result = [];
  if (holdyTpCd === '일반휴일') {
    result = checkEmptyNormalHoliday(nextHolidayList, begDt, holdyNm);
  } else if (holdyTpCd === '배송휴일') {
    result = checkEmptyDeliverHoliday(nextHolidayList, begDt);
  }
  if (result[0] === 200) {
    nextHolidayList = nextHolidayList.concat({
      begDt,
      holdyNm,
      createdBy,
      createdAt,
      holdyTpCd,

      // 임시추가
      holdySn: 100,
      lastModifiedAt: createdAt,
      lastModifiedBy: createdBy
    });
    return nextHolidayList;
  }
  return result;
}

// 일반휴일일 경우 체크함. 비어있는 일반휴일이 있는지, 이미 있는지..
function checkEmptyNormalHoliday(holidayList, begDt, holdyNm) {
  // 내보낼 새로운 HolidayList.
  let nextHolidayList = [...holidayList];
  // 복사한 holidayList에 대해 작업한다.
  for (let i = 0; i < nextHolidayList.length; i++) {
    // 만약 기간이 같고, 일반휴일이 이미 있을때
    if (begDt === nextHolidayList[i].begDt && nextHolidayList[i].holdyTpCd === '일반휴일') {
      // 하지만 휴일명이 빈 string ('') 라면, 이미 지웠지만 남아있는 데이터.
      if (nextHolidayList[i].holdyNm === '') {
        // 이름만 새롭게 바꿔주고 return 한다.
        nextHolidayList[i].holdyNm = holdyNm;
        return nextHolidayList;
      } else if (nextHolidayList[i].holdyNm !== '') {
        return [202, '이미 등록된 일반휴일이 있습니다.']
      }
    }
  }
  // 모두 통과하면 새롭게 데이터를 넣는다.
  return [200, 'addNew'];
}

// 배송휴일인 경우 체크하는 함수.
function checkEmptyDeliverHoliday(holidayList, begDt) {
  // 1. 먼저 이미 배송휴일이 있는지부터 검사한다.
  for (let i = 0; i < holidayList.length; i++) {
    if (holidayList[i].begDt === begDt && holidayList[i].holdyTpCd === '배송휴일')
      return [202, '이미 등록된 배송휴일이 있습니다.'];
  }

  // 2. 일반 휴일이 먼저 등록되어있는지 체크한다. 이 때 빈 문자열('')이면 안된다.
  for(let i = 0; i < holidayList.length; i++) {
    if(holidayList[i].begDt === begDt) {
      // 기간이 같고, 일반휴일이며, 삭제한 흔적('')이 없어야 새로운 데이터로 추가한다.
      if(holidayList[i].holdyTpCd === '일반휴일' && holidayList[i].holdyNm !== '') {
        return [200, 'addNew']
      }
    }
  }

  // 모두 거치지 않았다면. 등록되어 있는 일반휴일이 없는 것이다.
  return [202, '먼저, 해당날짜로 등록된 일반휴일이 있어야합니다.']
}
