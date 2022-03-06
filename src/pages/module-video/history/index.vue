<template>
  <div class="my-box row no-wrap full-height full-height">
    <div class="full-height column no-wrap overflow-hidden" style="width: 340px">
      <div class="flex1 overflow-hidden">
        <tree  :tree-list="treeList" :tree-node="treeNode"/>
      </div>
      <div class="q-pa-md">
        <div class="q-gutter-md">
          <q-input outlined dense placeholder="时间" >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            outlined
            label="视频通道"
            dropdown-icon="mdi-chevron-down"
            v-model="channel"
            :options="['通道1', '通道2', '通道3', '通道4']"
          >
          </q-select>
          <div>
            <q-btn label="搜索" color="primary" class="full-width" />
          </div>

        </div>
      </div>


    </div>
    <q-separator vertical />
    <div class="flex1 overflow-hidden column no-wrap">
      <div class="flex1 overflow-hidden row wrap">
        <div
          class="wrap-video-item shadow-4 overflow-hidden column no-wrap"
          v-for="(n, index) in videoList"
          :key="index"
        >
          <div class="row justify-between items-center q-pa-sm bg-grey-2">
            <div class="text-subtitle2">IEMI:{{ n.name }}</div>
            <div class="text-subtitle2">{{ n.speed }}kb/s</div>
            <q-btn flat round dense icon="clear" size="sm" />
          </div>
          <q-separator />
          <div class="flex1 overflow-hidden video-content">
            <video
              loop
              muted
              autoplay
              controls
              class="fit"
              src="../demo.mp4"
            ></video>
          </div>
        </div>
      </div>
      <my-table
        dense
        hide-bottom
        style="height: 180px"
        :rows="rows"
        :columns="columns"
        :total="20"
        :page="1"
      >
        <template #op>
          <div class="q-gutter-sm">
            <q-btn
              title="播放"
              color="primary"
              flat
              dense
              size="11px"
              round
              icon="mdi-play-circle-outline"
            />
            <q-btn
              title="下载"
              color="red-5"
              flat
              dense
              size="11px"
              round
              icon="mdi-download"
            />
          </div>
        </template>
      </my-table>
    </div>
  </div>
</template>

<script>
import Tree from '../tree';
import MyTable from "components/table";
import {ref, shallowRef} from "vue";
import {LEVEL} from "src/api/module";

export default {
  components: {
    Tree,
    MyTable,
  },
  setup() {
    const treeList = shallowRef([]);
    const treeNode = shallowRef([]);

    // 获取树数据
    const getTreeData = () => LEVEL.treeList()
    // 格式化树列表所需要的数据格式
    const formatTreeData = (oldArr, pIndex, vList = [], vObj = {}) => {
      const tree = [];
      let count = 0;
      let offlineCount = 0;
      let noVehicleCompanyCount = 0;
      oldArr.forEach((el, index) => {
        const {id, label, type, children, others} = el;
        const treeItem = {label, type};
        if (type == 1 || type == 2) {
          const _index =
            pIndex === undefined ? `${index}` : `${pIndex}-${index}`;
          treeItem["id"] = `${type == 1 ? "com" : "prj"}_${id}`;
          treeItem["index"] = _index;
          treeItem["count"] = 0;
          treeItem["offlineCount"] = 0;
          treeItem["onlineCount"] = 0;
          tree.push(treeItem);
          if (children) {
            const {
              tree: subTree,
              count: subCount,
              offlineCount: subOfflineCount,
            } = formatTreeData(children, _index, vList, vObj);
            subTree.length && (treeItem.children = subTree);
            if (subCount) {
              count += subCount;
              offlineCount += subOfflineCount;
              treeItem.count = subCount;
              treeItem.offlineCount = subOfflineCount;
              treeItem.onlineCount = subCount - subOfflineCount;
            } else {
              noVehicleCompanyCount += 1;
            }
          }
        } else if (type == 3) {
          const _index =
            pIndex === undefined
              ? index - noVehicleCompanyCount
              : `${pIndex}-${index - noVehicleCompanyCount}`;
          const status = others.onlineStatus;
          const termType = others.type;
          vList.push({
            id: "term_" + id,
            label,
            status,
            index: _index,
            termType,
          });
          vObj[`term_${id}`] = {label, status, index: _index};
          tree.push({
            id: "term_" + id,
            label,
            type,
            status,
            index: _index,
            termType,
          });
          count += 1;
          if (status === 0) offlineCount += 1;
        }
      });
      return {tree, count, offlineCount, vList, vObj};
    };
    // 渲染树
    const renderTree = () => {
      getTreeData().then(res => {
        const {tree, vList} = formatTreeData([res]);
        treeList.value = vList;
        treeNode.value = tree;
      })
    }
    renderTree()

    const selected = ref("Food");
    const videoList = ref([
      { name: "111", speed: "78" },
      { name: "112", speed: "68" },
      { name: "211", speed: "46" },
      { name: "314", speed: "99" },
    ]);
    const channel = ref('')
    const columns = [
      {
        name: "sTime",
        field: "sTime",
        label: "开始时间",
        align: "left",
      },
      {
        name: "eTime",
        field: "eTime",
        label: "结束时间",
        align: "left",
      },
      {
        name: "imei",
        field: "imei",
        label: "IMEI",
        align: "left",
      },
      {
        name: "channel",
        field: "imei",
        label: "通道",
        align: "left",
      },
      {
        name: "size",
        field: "size",
        label: "文件大小(MB)",
        align: "left",
      },
      {
        name: "op",
        label: "操作",
        field: "op",
        align: "center",
      },
    ];
    const rows = [
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "32462hygfg5",
        channel: "1",
        size: "0.5",
        time: "2021-06-05 13:05:05",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "32462hygfg5",
        channel: "2",
        size: "2.4",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "43r34vv3g3g",
        channel: "3",
        size: "4.2",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "fve343rvgf",
        channel: "4",
        size: "1.4",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "32462hygfg5",
        channel: "1",
        size: "0.5",
        time: "2021-06-05 13:05:05",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "32462hygfg5",
        channel: "2",
        size: "2.4",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "43r34vv3g3g",
        channel: "3",
        size: "4.2",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "fve343rvgf",
        channel: "4",
        size: "1.4",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "32462hygfg5",
        channel: "1",
        size: "0.5",
        time: "2021-06-05 13:05:05",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "32462hygfg5",
        channel: "2",
        size: "2.4",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "43r34vv3g3g",
        channel: "3",
        size: "4.2",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "fve343rvgf",
        channel: "4",
        size: "1.4",
      },
    ];

    return {
      treeList,
      treeNode,

      selected,
      videoList,
      channel,
      columns,
      rows,
    };
  },
};
</script>

<style scoped>
.wrap-video-item {
  width: 50%;
  height: 50%;
}

.wrap-video-item:nth-child(2),
.wrap-video-item:last-child {
  border-left: none;
}

.wrap-video-item:nth-child(3),
.wrap-video-item:last-child {
  border-top: none;
}

.video-content video {
  object-fit: fill;
}
</style>
