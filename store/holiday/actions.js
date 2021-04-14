import {holidayApis} from '~/apis/holiday'
import {CHANGE_HOLIDAY_LIST} from './mutations';

export const SEARCH = 'SEARCH';
export const INIT = 'INIT';
export const CHANGE = 'CHANGE';
export const DELETE = 'DELETE';

// 비동기 작업 actions
const actions = {

  // SEARCH 버튼을 클릭했을 때. startDate, endDate가 null인지에 따라 달라짐.
  async [SEARCH](context) {

    try {
      // 비동기작업!! 작업에 필요한 기능들은 모두 api로 호출
      let result = await holidayApis.loadDBJson(this.state.search);
      // 필터링된 result 커밋한다. 화면에 표시될 state.holidayList가 변경된다.
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
  [DELETE](context) {

    // 1. holidayList에서 check가 true이면서 배송휴일들은 모두 삭제시켜버린다.
    let nextData = context.state.holidayList.filter((holiday) =>
      !(holiday.check && holiday.type === '배송휴일'));

    // 2. 남은 holidayList에서 check가 true(일반휴일)인 요소들은 이름을 ''로 만들고 check를 푼다.
    nextData = nextData.map((holiday) => (holiday.check) ? {
        ...holiday,
        check: false,
        name: '',
      } :
      holiday
    );
    holidayApis.writeDBJson(nextData).then(r => console.log(r))
    /*
    * 비동기 작업(db 삭제 요청)
    * 일반휴일은 휴일명만 사라지고,
    * 배송휴일은 data까지 사라진다.
    * 뽑아낸 checkedHolidays의 휴일 유형에 따라 다른 로직을 수행하는 백엔드가 있어야함
    * 여기서는 프론트부분에서 처리.
    */
    // db작업을 넘긴다.
    //   let result = writeDBJson(nextData);
    // jsonDB와 동기화. 다시 SEARCH를 보낸다.
    context.commit({
      type: CHANGE_HOLIDAY_LIST,
      result: nextData,
    });


    // } catch (e) {
    //   console.log('holiday/DELETE 에러');
    //   console.error(e);
    // }
  }
}

export default actions;
