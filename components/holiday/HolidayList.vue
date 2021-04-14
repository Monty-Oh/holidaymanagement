<template>
  <div>
    <client-only>
      <JqxGrid
        :width="'100%'"
        :source="dataAdapter"
        :columns="columns"
        :pageable="true"
        :altrows="true"
        :editable="true"
        @cellvaluechanged="onChange"
        ref="holidayGrid"
      />
    </client-only>
    <button>testing...</button>
    {{holidayList}}
  </div>

</template>

<script>
import {mapGetters} from "vuex";
import {CHANGE} from "../../store/holiday";

export default {
  data() {
    return {
      // beforeCreate의 this.source와 연결됨.
      dataAdapter: new jqx.dataAdapter(this.source, {
        // load가 성공했을 때
        loadComplete: function (data) {
          console.log("data is Loaded");
        },

        // load가 실패했을 때
        loadError: function (xhr, status, error) {
          console.log("load error");
        }
      }),
      // 테이블에 대한 정보
      columns: [
        {text: 'id', datafield: 'id', hidden: true},
        {text: '체크', columntype: 'checkbox', datafield: 'check', width: 50},
        {text: '기간', datafield: 'date', width: 150},
        {text: '휴일명', datafield: 'name', width: 130},
        {text: '등록자', datafield: 'register', width: 120},
        {text: '등록일시', datafield: 'regitDate', width: 200},
        {text: '휴일유형', datafield: 'type', width: 130}
      ]
    }
  },

  methods: {
    // JpxGrid change 이벤트
    onChange() {
      // ref로 지정해둔 Grid에서 rows를 가져온다.
      const rows = this.$refs.holidayGrid.getrows();

      // 가져온 rows로 대체한다.
      this.$store.dispatch({
        type: CHANGE,
        values: rows,
      })

      /*
      * 체크된 rows만을 찾아서 바꾼다 -> 탐색에 대한 시간이 걸림
      * 그냥 전부다 교체해버린다 -> 탐색에 대한 시간이 걸리지 않지만,
      * 데이터가 많아지면 어찌될지 모르겠음. 현재는 이를 선택.
      */
    },

    // store와의 데이터를 다시 바인딩한다. watch.holidayList에서 쓰인다.
    reBindData() {
      // store에서 getters를 통해 holidayList를 호출한다.
      this.source.localdata = this.$store.getters["holiday/holidayList"];
      this.$refs.holidayGrid.updatebounddata('data');
      this.$refs.holidayGrid.selectrow(0);
    }
  },

  // store로부터 holidayList를 가져온다. 이는 watch가 지켜보게 된다.
  computed: {
    ...mapGetters({
      holidayList: 'holiday/holidayList'
    })
  },

  // 데이터 변화를 감지, 특정 로직을 수행한다.
  watch: {
    // holidayList에 대한 변화가 감지된다면, methods의 reBindData 메소드가 실행된다.
    holidayList: 'reBindData',
    source: 'test',
  },

  beforeCreate() {
    this.source = {
      localdata: [],
      datafields: [
        {name: 'id', type: 'number', map: '0'},
        {name: 'check', type: "bool", map: '1'},
        {name: 'date', type: 'string', map: '2'},
        {name: 'name', type: 'string', map: '3'},
        {name: 'register', type: 'string', map: '4'},
        {name: 'regitDate', type: 'string', map: '5'},
        {name: 'type', type: 'string', map: '6'}
      ],
      datatype: 'array'
    };
  }
}
</script>
