import { CHANGE_TARGET_VALUE, INIT_STATE } from './mutations';

export const CHANGE_VALUE = 'CHANGE_VALUE';
export const INIT = 'INIT';

const actions = {
  [CHANGE_VALUE](context, { target, value }) {
    context.commit({
      type: CHANGE_TARGET_VALUE,
      target,
      value
    })
  },
  [INIT](context) {
    context.commit({
      type: INIT_STATE
    })
  }
}

export default actions;
