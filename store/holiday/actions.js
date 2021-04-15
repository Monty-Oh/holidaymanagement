import {loadDBJson, writeDBJson} from '~/apis/holiday'
import {CHANGE_HOLIDAY_LIST} from './mutations';

export const SEARCH = 'SEARCH';
export const INIT = 'INIT';
export const CHANGE = 'CHANGE';
export const DELETE = 'DELETE';
export const ADD_HOLDY = 'ADD_HOLDY';

// 비동기 작업 actions
const actions = {

  // SEARCH 버튼을 클릭했을 때. startDate, endDate가 null인지에 따라 달라짐.
  async [SEARCH](context) {
    try {
      // 비동기작업!! 작업에 필요한 기능들은 모두 api로 호출
      const result = (await this.$axios.get('/apis/holdy')).data.holidayList;

      //필터링된 result 커밋한다. 화면에 표시될 state.holidayList가 변경된다.
      context.commit({
        type: CHANGE_HOLIDAY_LIST,
        result,
      });

    } catch (e) {
      console.error('actions/SEARCH 에러');
      console.error(e);
    }
  },

  // holidayList 초기화
  [INIT](context) {
    context.commit({
      type: CHANGE_HOLIDAY_LIST,
      result: [],
    })
  },

  // state.holiday change 이벤트
  [CHANGE](context, {values}) {
    context.commit({
      type: CHANGE_HOLIDAY_LIST,
      result: values,
    })
  },

  // checked 된 상태값들에 대해 DB에 삭제 요청을 한다. 성공했을 때 mutations로 넘어감.
  async [DELETE](context) {

    // 1. holidayList에서 check가 true이면서 배송휴일들은 모두 삭제시켜버린다.
    let nextData = context.state.holidayList.filter((holiday) =>
      !(holiday.check && holiday.holdyTpCd === '배송휴일'));

    // 2. 남은 holidayList에서 check가 true(일반휴일)인 요소들은 이름을 ''로 만들고 check를 푼다.
    nextData = nextData.map((holiday) => (holiday.check) ? {
        begDt: holiday.begDt,
        holdyNm: '',
        createdBy: holiday.createdBy,
        createdAt: holiday.createdAt,
        holdyTpCd: holiday.holdyTpCd,
        holdySn: holiday.holdySn,
        lastModifiedAt: holiday.lastModifiedAt,
        lastModifiedBy: holiday.lastModifiedBy,
      } :
      {
        begDt: holiday.begDt,
        holdyNm: holiday.holdyNm,
        createdBy: holiday.createdBy,
        createdAt: holiday.createdAt,
        holdyTpCd: holiday.holdyTpCd,
        holdySn: holiday.holdySn,
        lastModifiedAt: holiday.lastModifiedAt,
        lastModifiedBy: holiday.lastModifiedBy,
      }
    );

    // writeDBJson(nextData).then(r => console.log(r))
    /*
    * 비동기 작업(db 삭제 요청)
    * 일반휴일은 휴일명만 사라지고,
    * 배송휴일은 data까지 사라진다.
    * 뽑아낸 checkedHolidays의 휴일 유형에 따라 다른 로직을 수행하는 백엔드가 있어야함
    * 여기서는 프론트부분에서 처리.
    */
    // 새로운 holdyList로 저장을 보낸다.
    await this.$axios.post('/apis/holdy', {
      data: nextData,
    })

    // 완료 됐다면 새로운 데이터를 다시 받아와서 그대로 저장한다.
    const result = (await this.$axios.get('/apis/holdy')).data.holidayList;

    // 받아온 데이터로 store에 저장한다.
    context.commit({
      type: CHANGE_HOLIDAY_LIST,
      result,
    });
  },

  // 휴일 생성 이벤트 발생.
  async [ADD_HOLDY](context, { begDt, holdyTpCd, holdyNm, createdAt }) {
    // holdyTpCd가 일반휴일이면 이미 있는지 체크(일반휴일 or ''), 배송휴일이면 이미 일반휴일이 있는지 체크.
    try {
      const result = await this.$axios.post('/apis/holdy/item', {
        data: {
          begDt: new Date(begDt),
          holdyTpCd,
          holdyNm,
          createdAt,
          createdBy: 'monty_addTest'
        }
      })
      // 이미 일반 배송 휴일이 있을 때.
      if(result.status === 202)
        return [true, result.data];
      else {
        context.commit({
          type: CHANGE_HOLIDAY_LIST,
          result: result.data.holidayList,
        });
        return [false];
      }
    } catch (e) {
      console.log('vuex ADD_HOLDY Error');
      console.error(e);
    }
  }
}

export default actions;
