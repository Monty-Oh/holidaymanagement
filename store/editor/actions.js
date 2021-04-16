export const CHANGE = "CHANGE";
export const INIT = "INIT";

import {CHANGE_KEY_VALUE, INITIALIZE} from './mutations';

const actions = {
  // [CHANGE](context, {holdyNm, begDt, holdySn, holdyTpCd, createdAt, createdBy, lastModifiedAt, lastModifiedBy}) {
  [CHANGE](context, {data}) {
    context.commit({
      type: CHANGE_KEY_VALUE,
      data,
    });
  },

  [INIT](context) {
    context.commit({
      type: INITIALIZE
    })
  }
}

export default actions;
