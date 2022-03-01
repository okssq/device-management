<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row">
      <q-card style="width: 260px" v-for="item in configList" :key="item.id">
        <q-img :src="imgObj[item.id]" style="width: 260px; height: 180px" />
        <q-separator />
        <q-card-section>
          <div class="row no-wrap items-center justify-between">
            <div class="col text-subtitle1 ellipsis">{{ item.label }}</div>
            <q-badge>{{ item.version }}</q-badge>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-subtitle2 text-grey-6">备注：{{ item.remark }}</div>
          <div class="text-subtitle2 text-grey-6">
            创建时间：{{ item.time }}
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn flat color="primary" @click="onCustomStyle(item)">
            自定义样式
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
  <custom-style
    v-if="customStyleVisible"
    :data="customStyleData"
    @cancel="customStyleVisible = false"
  ></custom-style>
</template>
<script>
import CustomStyle from "./custom-style";
import { ref, shallowRef, toRaw } from "vue";
export default {
  emits: ["cancel"],
  components: {
    CustomStyle,
  },
  setup() {
    const imgObj = {
      1: "/images/chuwugui-shiwu.png",
      2: "/images/huishou-shiwu.png",
    };
    const configList = [
      {
        id: "1",
        label: "储物柜",
        version: "v1.1.0",
        remark: "储物柜v1.1.0样式配置",
        time: "2020/02/24",
      },
      {
        id: "2",
        label: "瓶子回收器",
        version: "v1.1.1",
        remark: "瓶子回收器v1.1.1样式配置",
        time: "2020/02/24",
      },
    ];
    const customStyleData = shallowRef(null);
    const customStyleVisible = ref(false);
    const onCustomStyle = (item) => {
      const data = toRaw(item);
      customStyleData.value = data;
      customStyleVisible.value = true;
    };
    return {
      imgObj,
      configList,
      customStyleVisible,
      customStyleData,
      onCustomStyle,
    };
  },
};
</script>
