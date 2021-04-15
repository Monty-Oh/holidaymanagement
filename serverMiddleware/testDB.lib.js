// add 작업을 하고 완료된 데이터를 return 한다.
export const AddHoldy = function (holidayList, {begDt, holdyTpCd, holdyNm, createdAt, createdBy}) {
  let nextHolidayList = [...holidayList]
  if (holdyTpCd === '일반휴일') {
    const result = checkEmptyNormalHoliday(nextHolidayList, begDt, holdyNm);
    if (result[0] === 'addNew') {
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
  } else if (holdyTpCd === '배송휴일') {
    const result = checkEmptyDeliverHoliday(nextHolidayList, begDt);
    if (result[0] === 'addNew') {
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
}

function checkEmptyNormalHoliday(holidayList, begDt, holdyNm) {
  let nextHolidayList = [...holidayList];
  for (let i = 0; i < nextHolidayList.length; i++) {
    if (begDt === nextHolidayList[i].begDt && nextHolidayList[i].holdyTpCd === '일반휴일') {
      if (nextHolidayList[i].holdyNm === '') {
        nextHolidayList[i].holdyNm = holdyNm;
        return nextHolidayList;
      } else if (nextHolidayList[i].holdyNm !== '') {
        return ['normalAlreadyExist']
      }
    }
  }
  return ['addNew'];
}

function checkEmptyDeliverHoliday(holidayList, begDt) {
  // 1. 먼저 이미 배송휴일이 있는지부터 검사한다.
  for (let i = 0; i < holidayList.length; i++) {
    if (holidayList[i].begDt === begDt && holidayList[i].holdyTpCd === '배송휴일')
      return ['deliverAlreadyExist'];
  }

  // 2. 일반 휴일이 먼저 등록되어 있는지를 검사한다.
  // 2-1. 일반 휴일이며 ''이 아닌 것이 있는지를 체크, some
  if (holidayList.some((holiday) =>
    (holiday.holdyTpCd === '일반휴일' && holiday.holdyNm !== ''))) {
    // 배송휴일 등록
    return ['addNew'];
  } else {
    // 배송등록 못함. 일반휴일 있어야해!!
    return ['normalNotExist']
  }
}


// // 없다면 true, 있다면 false, 있는데 ''면 해당 holdyNm으로 교체하고 false
// function checkEmptyNormalHoliday(holidayList, begDt, holdyNm) {
//   const nextHolidayList = holidayList.map((holiday) => {
//     return {
//       ...holiday
//     }
//   })
//   for(let i = 0; i < holidayList.length; i++) {
//     if(holidayList[i].holdyTpCd === '일반휴일' && holidayList[i].begDt === begDt) {
//       if(holidayList[i].holdyNm === '') {
//         nextHolidayList[i].holdyNm = holdyNm;
//         return [true, nextHolidayList];
//       }
//       else if(holidayList[i].holdyNm !== '') return [false, nextHolidayList];
//     }
//   }
//   return [true, nextHolidayList];
// }
