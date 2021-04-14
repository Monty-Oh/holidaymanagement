export const CHANGE_TARGET_VALUE = 'CHANGE_VALUE'
export const INIT_STATE = 'INIT_STATE';

const mutations = {
  [CHANGE_TARGET_VALUE](state, {target, value}) {
    state[target] = value;
  },
  [INIT_STATE](state) {
    state.startDate = null;
    state.endDate = null;
    state.normalHoliday = false;
    state.transferHoliday = false;
  }
}

export default mutations;
