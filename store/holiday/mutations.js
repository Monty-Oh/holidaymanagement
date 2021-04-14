export const CHANGE_HOLIDAY_LIST = 'CHANGE_HOLIDAY_LIST'

const mutations = {
  [CHANGE_HOLIDAY_LIST](state, {result}) {
    state.holidayList = result;
  }
}

export default mutations;
