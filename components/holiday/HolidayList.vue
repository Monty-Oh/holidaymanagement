<template>
  <div>
    <holiday-list-buttons></holiday-list-buttons>
    <holiday-list-jqx-grid></holiday-list-jqx-grid>
    <modal v-if="modal"></modal>
  </div>
</template>

<script>
import HolidayListJqxGrid from "@/components/holiday/HolidayListJqxGrid";
import HolidayListButtons from "@/components/holiday/HolidayListButtons";
import Modal from "@/components/common/Modal";


export default {
  components: {
    HolidayListJqxGrid,
    HolidayListButtons,
    Modal
  },
  data() {
    return {
      modal: false,
    }
  }
}
</script>
