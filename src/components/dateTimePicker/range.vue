<template>
  <div class="row justify-center items-center no-wrap range-date-picker">
    <span
      class="text-caption text-bold"
      style="margin-right: 6px; color: rgba(0, 0, 0, 0.54)"
      >登录时间：</span
    >
    <date-picker
      v-model:open="open"
      v-model:value="value2"
      type="datetime"
      placeholder="开始时间 ~ 结束时间"
    ></date-picker>
  </div>
</template>
<script>
import DatePicker from "vue-datepicker-next";
// import "src/css/datepicker.scss";
import "vue-datepicker-next/index.css";
import { ref } from "vue";
export default {
  components: { DatePicker },
  data() {
    return {
      value2: [],
    };
  },
  setup() {
    const langObject = {
      formatLocale: {
        firstDayOfWeek: 1,
      },
      monthBeforeYear: false,
    };
    const langString = "zh-cn";
    const time1 = ref(null);
    const open = ref(true);
    return {
      langObject,
      langString,
      time1,
      open,
    };
  },
};
</script>
<style scoped>
.range-date-picker {
  width: 280px;
}
</style>
