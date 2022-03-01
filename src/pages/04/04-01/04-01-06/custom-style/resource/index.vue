<template>
  <div
    class="full-height column no-wrap"
    style="width: 300px; min-width: 300px"
  >
    <q-scroll-area class="full-width flex1">
      <div class="row no-wrap items-center justify-between">
        <q-item-label header>广告资源列表</q-item-label>
        <q-btn
          flat
          dense
          round
          icon="add"
          color="primary"
          class="q-mr-sm"
          @click="onAddResource"
        />
      </div>
      <template v-for="item in resourceList" :key="item.id">
        <div class="row no-wrap items-center q-pa-sm item-resource">
          <div
            style="width: 120px; height: 90px"
            :id="item.id"
            @dragstart="onDragStart"
          >
            <img class="fit" v-if="item.type == 1" :src="item.url" />
            <video class="fit" autoplay v-else :src="item.url" />
          </div>
          <q-item-section class="q-ml-md q-mr-sm">
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>
          <q-btn
            flat
            dense
            round
            color="red-5"
            icon="close"
            @click="onRemove(item)"
          ></q-btn>
        </div>
        <q-separator></q-separator>
      </template>
    </q-scroll-area>
  </div>
</template>

<script>
import DialogAdd from "./dialog-add.vue";
import { useQuasar } from "quasar";
import { notifySuccess } from "src/util/common";
import { RESOURCE } from "src/api/module";
import { shallowRef } from "vue";
export default {
  setup() {
    const $q = useQuasar();
    const resourceList = shallowRef([
      {
        id: 1,
        type: 1,
        url: "http://mms2.baidu.com/it/u=1895335407,2753497845&fm=253",
      },
      {
        id: 2,
        type: 1,
        url: "https://mms1.baidu.com/it/u=1027959558,2472093700&fm=253",
      },
      {
        id: 3,
        type: 1,
        url: "http://mms0.baidu.com/it/u=1135969073,3125375329&fm=253",
      },
      {
        id: 4,
        type: 2,
        url: " https://www.w3school.com.cn/example/html5/mov_bbb.mp4",
      },
    ]);
    // 获取资源列表事件
    const getResourceList = () => {
      RESOURCE.list({ page: 1, pageSize: 999 })
        .then((res) => {
          console.log("getResourceList", res);
        })
        .catch(() => {});
    };
    // 新增资源按钮事件
    const onAddResource = () => {
      $q.dialog({
        component: DialogAdd,
      }).onOk(() => {
        notifySuccess("增加成功");
        // onSearch({ page: 1 });
      });
    };
    const onRemove = () => {};
    // 资源项开始被拖动
    const onDragStart = (e) => {
      console.log("onDragStart", e);
      console.log(" e.target.id", e.target.id);
      e.dataTransfer.setData("dragId", e.target.id);
      e.dataTransfer.dropEffect = "move";
    };
    getResourceList();

    return {
      resourceList,
      onDragStart,
      onAddResource,
      onRemove,
    };
  },
};
</script>

<style></style>
