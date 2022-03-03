<template>
  <div
    class="full-height column no-wrap relative-position"
    style="width: 300px; min-width: 300px"
  >
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
    <q-scroll-area class="full-width flex1">
      <template v-for="item in resourceList" :key="item.id">
        <div class="row no-wrap items-center q-pa-sm item-resource">
          <div
            style="width: 120px; height: 90px"
            :id="`res${item.id}`"
            :draggable="true"
            @dragstart="onDragStart"
          >
            <img :draggable="false" class="fit" v-if="item.resource.includes('jpg')"
                 :src="'http://mms2.baidu.com/it/u=1895335407,2753497845&fm=253' || item.resource"/>
            <video :draggable="false" class="fit" autoplay v-else
                   :src="'https://www.w3school.com.cn/example/html5/mov_bbb.mp4' || item.resource"/>
          </div>
          <q-item-section class="q-ml-md q-mr-sm">
            <q-item-label>{{ item.descMsg }}</q-item-label>
            <q-item-label caption>{{ item.fileSize }}</q-item-label>
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
    <q-inner-loading :showing="loading" style="z-index: 100">
      <q-spinner-tail color="primary" size="2em"/>
    </q-inner-loading>
  </div>
</template>

<script>
import DelConfirm from "components/del-confirm";
import DialogAdd from "./dialog-add.vue";
import {useQuasar} from "quasar";
import {notifySuccess} from "src/util/common";
import {RESOURCE} from "src/api/module";
import {ref, shallowRef, toRaw} from "vue";

export default {
  setup() {
    const $q = useQuasar();
    const loading = ref(false)
    const resourceList = shallowRef([]);
    // 获取资源列表事件
    const getResourceList = () => {
      loading.value = true
      RESOURCE.list({page: 1, pageSize: 999})
        .then((res) => {
          resourceList.value = res.results || [];
          console.log("getResourceList", res);
        })
        .finally(() => {
          loading.value = false
        });
    };
    // 新增资源按钮事件
    const onAddResource = () => {
      $q.dialog({
        component: DialogAdd,
      }).onOk(() => {
        notifySuccess("增加成功");
        getResourceList()
      });
    };
    // 删除资源项事件
    const onRemove = (row) => {
      $q.dialog({
        component: DelConfirm,
      }).onOk(() => {
        loading.value = true;
        RESOURCE.del({id: row.id})
          .then(() => {
            notifySuccess("删除成功");
            getResourceList();
          })
          .catch(() => {
          })
          .finally(() => {
            loading.value = false;
          });
      });
    };
    // 资源项开始被拖动
    const onDragStart = (e) => {
      if (!e.target.draggable) return
      const id = e.target.id.slice(3)
      const findItem = toRaw(resourceList.value).find(el => el.id == id)
      const str = JSON.stringify(findItem)
      e.dataTransfer.setData("dragStr", str);
      e.dataTransfer.dropEffect = "move";
    };

    getResourceList();
    return {
      loading,
      resourceList,

      onAddResource,
      onRemove,

      onDragStart,
    };
  },
};
</script>

<style></style>
