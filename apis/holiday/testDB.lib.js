/*
* 분리해든 function들
*/

// input값인 String타입의 date를 Date객체로 변환
function formatDate(begDt) {
  const dates = begDt.split('-');
  const newDate = new begDt(dates[0], dates[1], dates[2]);
  return newDate;
}

// 날짜를 기준으로 필터링.
export function filterByCreatedAt(startDate, endDate, result) {
  let nextHolidayList = [];

  // 1차 필터링. date를 기준으로 필터링

  // 둘 다 비어있을 때. 모두 가져온다.
  if (startDate === null && endDate === null) {
    nextHolidayList = result;
  }
  // endDate가 비어있을 때. startDate 이후는 모두 불러온다.
  else if (endDate === null) {
    const formattedStartDate = formatDate(startDate);

    // startDate보다 큰 요소들을 필터링함.
    nextHolidayList = result.filter((holiday) =>
      formattedStartDate <= formatDate(holiday.begDt));
  }

  // startDate가 비어있을 때 endDate 이전은 모두 불러온다.
  else if (startDate === null) {
    const formattedEndDate = formatDate(endDate);

    // endDate보다 작은 요소를 필터링함
    nextHolidayList = result.filter((holiday) =>
      formatDate(holiday.begDt) <= formattedEndDate);
  }
  // 둘다 데이터 값이 있을 때 사이를 불러온다.
  else {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // startDate <= 요소들 <= endDate 필터링함.
    nextHolidayList = result.filter((holiday) =>
      formattedStartDate <= formatDate(holiday.begDt) && formatDate(holiday.begDt) <= formattedEndDate);
  }

  return nextHolidayList;
}

// 타입을 기준으로 필터링
export function filterByHoldyTpCd(normalHoliday, transferHoliday, result) {
  //1: 일반휴일 2: 배송휴일
  let nextHolidayList = [];
  // 일반휴일만 체크
  if (normalHoliday && !transferHoliday) {
    nextHolidayList = result.filter((holiday) => holiday.holdyTpCd === '일반휴일');
  }
  // 배송휴일만 체크
  else if (!normalHoliday && transferHoliday) {
    nextHolidayList = result.filter((holiday) => holiday.holdyTpCd === '배송휴일');
  }
  // 모두 체크거나 모두 아니거나.
  else {
    nextHolidayList = result;
  }

  return nextHolidayList;
}

export function checkHolidayList(holidayList) {
  return holidayList.map((item) => {
    return {
      holdySn: item.holdySn,
      begDt: item.begDt,
      holdyNm: item.holdyNm,
      createdBy: item.createdBy,
      createdAt: item.createdAt,
      holdyTpCd: item.holdyTpCd,
    }
  })
}
