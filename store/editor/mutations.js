export const CHANGE_KEY_VALUE = 'CHANGE_KEY_VALUE';
export const INITIALIZE = 'INITIALIZE';

const mutations = {
  [CHANGE_KEY_VALUE](state, {
    data:
      {holdyNm, begDt, holdySn, holdyTpCd, createdAt, createdBy, lastModifiedAt, lastModifiedBy}
  }) {
    state.holdyNm = holdyNm;
    state.begDt = begDt;
    state.holdySn = holdySn;
    state.holdyTpCd = holdyTpCd;
    state.createdAt = createdAt;
    state.createdBy = createdBy;
    state.lastModifiedAt = lastModifiedAt;
    state.lastModifiedBy = lastModifiedBy;
  },

  [INITIALIZE](state) {
    state.holdyNm = '';
    state.begDt = null;
    state.holdySn = '';
    state.holdyTpCd = '';
    state.createdAt = null;
    state.createdBy = '';
    state.lastModifiedAt = null;
    state.lastModifiedBy = '';
  }
}

export default mutations;
