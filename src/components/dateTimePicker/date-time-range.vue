<template>
  <q-input
    outlined
    dense
    style="width: 370px"
    input-class="text-caption"
    placeholder="开始时间 ~ 结束时间"
    :model-value="inputValue"
  >
    <template #before>
      <span class="text-caption text-bold">{{ labelText }}：</span>
    </template>
    <template #append v-if="inputValue">
      <q-btn
        unelevated
        dense
        color="grey-6"
        size="8px"
        icon="clear"
        round
        @click.prevent.stop="onClear"
      />
    </template>
    <q-menu @hide="onHide">
      <div class="q-pa-none">
        <!-- <div
          class="bg-primary text-grey-2 text-subtitle1 q-px-sm q-py-md column no-wrap items-center"
          style="height: 70px"
        >
          <span class="text-subtitle1" v-if="!fullDateTime"
            >请选择开始时间至结束时间！</span
          >
          <template v-else>
            <span class="flex1">{{ fullDateTime.from }}</span>
            <span class="flex1">{{ fullDateTime.to }}</span>
          </template>
        </div> -->
        <q-tabs
          dense
          class="bg-primary text-white"
          align="justify"
          v-model="tab"
        >
          <q-tab name="date" icon="date_range" />
          <q-tab name="time" icon="schedule" />
        </q-tabs>
        <!-- <q-separator /> -->
        <q-tab-panels v-model="tab" animated class="no-shadow">
          <q-tab-panel name="date" class="q-pa-none">
            <q-date
              minimal
              range
              today-btn
              class="no-border-radius"
              mask="YYYY-MM-DD"
              v-model="date"
            />
          </q-tab-panel>
          <q-tab-panel name="time" class="q-pa-none">
            <div
              class="main q-pa-md row no-wrap justify-between items-center"
              style="height: 290px; width: 290px"
            >
              <scroll-picker
                style="background: white; height: 250px"
                inactive-style="color: lightgrey; font-size: 14px;"
                active-style="color: grey; font-size: 16px;"
                :wheel-speed="0.3"
                :options="timeOptions"
                v-model="startTime"
              />
              <span>—</span>
              <scroll-picker
                style="background: white; height: 250px"
                inactive-style="color: lightgrey; font-size: 14px;"
                active-style="color: grey; font-size: 16px;"
                :wheel-speed="0.3"
                :options="timeOptions"
                v-model="endTime"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <q-separator />
        <q-card-actions align="right">
          <q-btn v-close-popup flat>取消</q-btn>
          <q-btn v-close-popup flat @click="onOk">确 定</q-btn>
        </q-card-actions>
      </div>
    </q-menu>
  </q-input>
</template>
<script>
import { ref, computed, toRaw } from "vue";
import { getToday } from "src/util/date-time";
import ScrollPicker from "vue3-scroll-picker";
export default {
  emits: ["update:from", "update:to"],
  components: {
    ScrollPicker,
  },
  props: {
    labelText: {
      type: String,
      default: "选择时间",
    },
    from: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const formatOptions = (length = 0) => {
      return Array.from({ length }, (a, index) => {
        const label = index < 10 ? "0" + index : index + "";
        return { label, value: label };
      });
    };
    const tab = ref("date");
    const timeOptions = ref([
      formatOptions(24),
      formatOptions(60),
      formatOptions(60),
    ]);
    const date = ref(null);
    const startTime = ref(["00", "00", "00"]);
    const endTime = ref(["23", "59", "59"]);

    const startTimeStr = computed(() => {
      return startTime.value.join(":");
    });
    const endTimeStr = computed(() => {
      return endTime.value.join(":");
    });
    const fullDateTime = computed(() => {
      const d = toRaw(date.value);
      if (!d) return null;
      if (d && d.from) {
        return {
          from: `${d.from} ${startTimeStr.value}`,
          to: `${d.to} ${endTimeStr.value}`,
        };
      } else {
        return {
          from: `${d} ${startTimeStr.value}`,
          to: `${d} ${endTimeStr.value}`,
        };
      }
    });
    const inputValue = computed(() => {
      if (props.from && props.to) {
        return `${props.from}~${props.to}`;
      }
      return null;
    });

    const onClear = () => {
      date.value = null;
      emit("update:from", "");
      emit("update:to", "");
    };
    const onOk = () => {
      emit("update:from", fullDateTime.value ? fullDateTime.value.from : "");
      emit("update:to", fullDateTime.value ? fullDateTime.value.to : "");
    };
    const onHide = () => {
      const outFrom = props.from + "";
      const outTo = props.to + "";
      const innerFrom = fullDateTime.value ? fullDateTime.value.from : "";
      const innerTo = fullDateTime.value ? fullDateTime.value.to : "";
      if (outFrom !== innerFrom || outTo !== innerTo) {
        console.log("需要调整时间");
        if (!outFrom) {
          date.value = null;
          startTime.value = ["00", "00", "00"];
          endTime.value = ["23", "59", "59"];
        } else {
          date.value = outFrom.substring(0, 10);
          startTime.value = outFrom.slice(-8).split(":");
          endTime.value = outTo.slice(-8).split(":");
        }
      }
      // console.log("onHide");
    };
    const setToday = () => {
      const { todayStr } = getToday();
      date.value = todayStr;
      emit("update:from", fullDateTime.value.from);
      emit("update:to", fullDateTime.value.to);
    };
    setToday();
    return {
      tab,
      timeOptions,
      date,
      startTime,
      endTime,
      startTimeStr,
      endTimeStr,
      fullDateTime,
      inputValue,
      onHide,
      onOk,
      onClear,
    };
  },
};
</script>
<style scoped>
.range-date-picker {
  width: 280px;
}
</style>
