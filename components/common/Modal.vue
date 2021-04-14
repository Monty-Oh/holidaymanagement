<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h3>휴일 등록</h3>
              <hr>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div>
                현재 날짜 : {{todayDate}}
              </div>
              <div>
                <div>
                  기간 : <input v-model='date' type="date">
                </div>
                <div>
                  휴일 유형 :
                  <div class="modal-radio">
                    <input type="checkbox" checked="checked" disabled="disabled">
                    일반휴일
                  </div>
                  <div class="modal-radio">
                    <input v-model="isTransfer" type="checkbox">
                    배송휴일
                  </div>
                </div>
                휴일명 : <input class="input-name" v-bind:date="date" @change="onChangeTextArea">
              </div>

            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="onClickCloseModal">
                닫기
              </button>
              <button class="modal-default-button" @click="onClickCloseModal">
                저장
              </button>

            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      date: null,
      isNormal: true,
      isTransfer: false,
      name: '',
    }
  },
  methods: {
    onClickCloseModal() {
      this.$emit('onClickCloseModal');
    },
    onChangeTextArea(e) {
      this.name = e.target.value;
      console.log(this.name);
    }
  },
  computed: {
    todayDate() {
      const date = new Date();
      const result = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      return result;
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-radio {
  margin-left: 1rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-footer {
  margin-bottom: 4rem;
}
</style>
