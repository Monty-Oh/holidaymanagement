<template>
  <div class="buttons-wrapper">
    <button>등록</button>
    <button @click="onClickDelete">삭제</button>
  </div>
</template>

<script>
import { DELETE } from "../../store/holiday";

export default {
  methods: {
    onClickDelete() {
      this.$store.dispatch({
        type: DELETE
      })
    }
  }
}
</script>

<style scoped>

</style>
