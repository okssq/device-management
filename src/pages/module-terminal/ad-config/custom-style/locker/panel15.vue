<template>
  <top></top>
  <div class="flex1 q-px-lg q-py-sm column no-wrap">
    <div class="flex1 column no-wrap justify-around items-center">
      <div class="text-h6 text-center text-bold q-mb-md">问题反馈</div>
      <div style="width: 80%">
        <div class="text-subtitle1">
          选择您遇到的问题(可多选)
          <!-- <div class="text-subtitle2"> -->
          <q-btn dense color="primary">
            添加选项
            <q-popup-edit v-model="inputText" auto-save v-slot="scope">
              <q-input v-model="inputText" dense autofocus counter>
                <template #append>
                  <q-btn flat dense icon="save" @click="save(scope)"> </q-btn>
                </template>
              </q-input>
            </q-popup-edit>
          </q-btn>
          <!-- </div> -->
        </div>
        <div class="text-caption">若有其他问题请直接致电西湖游客服务中心</div>
        <div class="q-my-sm" style="margin-left: -2px">
          <div
            class="row no-wrap items-center"
            v-for="(item, index) in options"
            :key="index"
          >
            <q-checkbox dense v-model="select" :val="item" :label="item" />
            <q-btn
              flat
              dense
              round
              color="red"
              class="q-ml-lg"
              icon="close"
              @click="remove(index)"
            ></q-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <q-btn unelevated color="green">提交</q-btn>
    </div>
  </div>
  <bottom></bottom>
</template>

<script>
import { ref } from "vue";
import Top from "./top.vue";
import Bottom from "./bottom.vue";
export default {
  components: {
    Top,
    Bottom,
  },
  setup() {
    const select = ref([]);
    const options = ref([
      "柜门无法关闭",
      "柜门关闭后还有物品在柜",
      "扣除绿色能量后柜门未开启",
      "使用未超过4小时被扣除文明分",
      "无法支付绿色能量",
    ]);
    const inputText = ref("新添加的选项");
    const remove = (index) => {
      const str = options.value[index];
      options.value = options.value.filter((el, _index) => {
        return _index !== index;
      });
      select.value = select.value.filter((el) => {
        return el !== str;
      });
    };
    const save = (scope) => {
      options.value.push(inputText.value);
      scope.set();
    };
    return {
      select,
      options,

      inputText,
      remove,
      save,
    };
  },
};
</script>

<style></style>
