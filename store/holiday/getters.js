const getters = {
  // 객체 형태의 holiday를 배열로 바꿔서 return해야함.
  holidayList: state => {
    return state.holidayList.map((holiday) => {
      return [
        holiday.check ? holiday.check : false,
        new Date(holiday.begDt),
        holiday.holdyNm,
        holiday.createdBy,
        new Date(holiday.createdAt),
        holiday.holdyTpCd,
        holiday.holdySn,
        holiday.lastModifiedAt,
        holiday.lastModifiedBy,
      ]
    });
  },
}

export default getters;
