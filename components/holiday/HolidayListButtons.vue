<template>
  <div class="buttons-wrapper">
    <button @click="onClickOpenModal">등록</button>
    <button @click="onClickDelete">삭제</button>
    <modal v-if="modal" @onClickCloseModal="onClickCloseModal"></modal>
  </div>
</template>

<script>
import Modal from "../common/Modal";
import { DELETE } from "../../store/holiday";

export default {
  data() {
    return {
      modal: false,
    }
  },
  components: {
    Modal
  },
  methods: {
    onClickDelete() {
      this.$store.dispatch({
        type: DELETE
      })
    },
    onClickCloseModal() {
      this.modal = false;
    },
    onClickOpenModal() {
      this.modal = true;
    }
  }
}
</script>

<style scoped>

</style>
