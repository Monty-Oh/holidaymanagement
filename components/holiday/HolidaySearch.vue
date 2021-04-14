<template>
  <div>
    <div class="holiday-search">
      <div class="holiday-date">
        <div class="box-wrapper">
          <div class="text-box">
            조회년월
          </div>
          <div class="input-box">
            <input v-model="startDate" type="date" @change="onChange('startDate')">
            ~
            <input v-model="endDate" type="date" @change="onChange('endDate')">
          </div>
        </div>
      </div>
      <div class="holiday-type">
        <div class="box-wrapper">
          <div class="text-box">
            휴일유형
          </div>
          <div class="input-box">
            <button @click="onClickEveryHoliday">전체</button>
            <input type="checkbox" v-model="normalHoliday" @change="onChange('normalHoliday')"> 일반휴일
            <input type="checkbox" v-model="transferHoliday" @change="onChange('transferHoliday')"> 배송휴일
          </div>
        </div>
      </div>
    </div>
    <holiday-search-buttons @onClickSearch="onClickSearch" @onClickInit="onClickInit"></holiday-search-buttons>
  </div>
</template>
<script>
// store와 관련된 작업은 현재 컴포넌트에서 한다.
// 이벤트 발생과 관련된 메소드는 자식컴포넌트 HolidaySearchButtons로 넘긴다.
import HolidaySearchButtons from "./HolidaySearchButtons";

// store에 dispatch할 actions를 import한다.
import * as holidayActions from '../../store/holiday';
import * as searchActions from "../../store/search";

export default {
  // 컴포넌트 선언
  components: {
    HolidaySearchButtons,
  },

  // 사용할 데이터 필드, 시작날짜, 끝 날짜, 일반휴일, 배송휴일
  data() {
    return {
      startDate: null,
      endDate: null,
      normalHoliday: false,
      transferHoliday: false,
    }
  },
  methods: {
    onChange(target) {
      this.$store.dispatch({
        type: searchActions.CHANGE_VALUE,
        target,
        value: this[target],
      })
    },

    // 전체 버튼 클릭 이벤트
    onClickEveryHoliday() {
      this.transferHoliday = true;
      this.normalHoliday = true;
      this.onChange('transferHoliday');
      this.onChange('normalHoliday');
    },

    // 조회 버튼 클릭 이벤트, HolidaySearchButtons컴포넌트로 넘긴다.
    onClickSearch() {
      // holiday/index.js 로 만들어둔 type로 dispatch한다.
      this.$store.dispatch({
        type: holidayActions.SEARCH,
      })
    },

    onClickInit() {
      this.$store.dispatch({
        type: holidayActions.INIT,
      });
      this.$store.dispatch({
        type: searchActions.INIT,
      })
      this.startDate = null;
      this.endDate = null;
      this.normalHoliday = false;
      this.transferHoliday = false;
    }
  }
}
</script>

<style scoped>
.holiday-search {
  border: 2.3px solid black;
  width: 100%;
  /*height: 2.5rem;*/
  text-align: center;
  display: block;
}

.holiday-date {
  display: inline-block;
  width: 49%;
}

.holiday-type {
  display: inline-block;
  width: 49%;
}

.box-wrapper {
  display: block;
}

.text-box {
  height: 100%;
  display: inline-block;
  text-align: left;
  padding: 5px 20px 5px 5px;
}

.input-box {
  display: inline-block;
}
</style>
