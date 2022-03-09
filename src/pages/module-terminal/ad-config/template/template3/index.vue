<template>
  <div class="flex1 row no-wrap overflow-hidden relative-position">
    <div class="flex1 column justify-center items-center relative-position overflow-hidden">
      <div :style="{ width: height / 1.4 + 'px', height: height + 'px' }" class="scene column no-wrap">
        <div class="q-ma-sm row no-wrap items-center justify-between">
          <div class="text-red-4 ">
            <q-badge align="middle" class="q-pa-xs" color="red-5" transparent>
              <q-icon color="white" name="sim_card_alert" size="18px"/>
              红色部分表示可编辑
            </q-badge>
          </div>
          <q-btn color="primary" icon="save" label="保存" unelevated @click="onSave"/>
        </div>
        <component :is="currentPanel" v-if="!loading"/>
      </div>
      <q-resize-observer @resize="onResize"/>
    </div>
    <q-separator vertical/>
    <q-tabs
      v-model="currentTab"
      active-bg-color="blue-1"
      active-color="black"
      class="full-height text-grey-7"
      indicator-color="transparent"
      inline-label
      mobile-arrows
      outside-arrows
      stretch
      style="width: 200px;min-width: 200px;"
      switch-indicator
      vertical
      @update:model-value="onTabChange"
    >
      <q-tab
        v-for="item in tabs"
        :key="item.name"
        :label="item.label+`——${item.name}`"
        :name="item.name"
        no-caps
      />
    </q-tabs>
    <q-inner-loading :showing="loading" style="z-index: 100">
      <q-spinner-tail color="primary" size="2em"/>
    </q-inner-loading>
  </div>
</template>

<script>
import {computed, provide, ref, shallowRef} from 'vue'
import {UI} from "src/api/module";
import {notifySuccess} from "src/util/common";
import Page1 from "./page1.vue";
import Page2 from "./page2.vue";
import Page3 from "./page3.vue";
import Page4 from "./page4.vue";
import Page5 from "./page5.vue";
import Page6 from "./page6.vue";
import Page7 from "./page7.vue";
import Page8 from "./page8.vue";

export default {
  components: {
    Page1,
    Page2,
    Page3,
    Page4,
    Page5,
    Page6,
    Page7,
    Page8,
  },
  setup() {
    const loading = ref(false)
    const tabs = [
      {name: "page1", label: "扫码界面"},
      {name: "page2", label: "开始投递"},
      {name: "page3", label: "开始投递(1)"},
      {name: "page4", label: "投递中"},
      {name: "page5", label: "投递中(1)"},
      {name: "page6", label: "问题反馈"},
      {name: "page7", label: "问题反馈(1)"},
      {name: "page8", label: "投递结束"},
    ];
    const currentTab = ref("page1");
    const currentPanel = computed(() => {
      const findItem = tabs.find((el) => el.name === currentTab.value);
      return findItem ? findItem.name : "page1";
    });
    const height = ref("1");
    const onResize = (report) => {
      height.value = report.height
    };

    let serverTemplateData = null //服务端的模板数据
    const templateData = shallowRef([
      {
        templateId: 3,
        page: 1,
        obj: {
          id1: [],
          id2: '扫码投递可回收孰料瓶',
          id3: '助力西湖垃圾分类',
          id4: '成功投递可回收塑料瓶可提升各人西湖文明分和获取绿色能量',
        }
      },
      {
        templateId: 3,
        page: 2,
        obj: {
          id1: [],
        }
      },
      {
        templateId: 3,
        page: 3,
        obj: {}
      },
      {
        templateId: 3,
        page: 4,
        obj: {
          id1: [],
        }
      },
      {
        templateId: 3,
        page: 5,
        obj: {
          id1: [],
          id2: '西湖环保，有你有我~',
          id3: '绿水青山就是金山银山',
        }
      },
      {
        templateId: 3,
        page: 6,
        obj: {
          id1: [],
          id2: '若有其他问题请直接致电西湖游客服务中心',
          id3: [
            '投屏技术不准确',
            '设备触摸不灵敏',
            '文明分/绿色能量未获取',
            '程序卡顿，不流畅',
            '使用过程中出现过死机',
            '投递流程太复杂，需要简化',
          ],
          id4: '西湖公园游客服务中心',
          id5: '12345678',
          id6: '08:00-18:00',
          id7: '福州市鼓楼区左海湖滨路70号',
        }
      },
      {
        templateId: 3,
        page: 7,
        obj: {}
      },
      {
        templateId: 3,
        page: 8,
        obj: {
          id1: []
        }
      },
    ])
    provide('templateData', templateData)

    // 获取页面模板保存的数据
    const getPageInfo = () => {
      loading.value = true
      UI.templateInfo({templateId: 3}).then(res => {
        const newTemplateData = []
        const arr = JSON.parse(JSON.stringify(templateData.value))
        arr.forEach(el => {
          const {page, obj} = el
          const findItem = (res || []).find(el => page == el.page)
          if (findItem) {
            const {id, txt, templateId} = findItem
            const item = {id, page, templateId}
            if (txt) {
              try {
                let newObj = {}
                const serverObj = JSON.parse(txt)
                Object.keys(obj).forEach(key => {
                  newObj[key] = serverObj[key] || obj['key']
                })
                item['obj'] = newObj
              } catch {
                item['obj'] = obj
              }
            } else {
              item['obj'] = obj
            }
            newTemplateData.push(item)
          } else {
            newTemplateData.push(el)
          }
        })
        serverTemplateData = JSON.parse(JSON.stringify(newTemplateData));
        templateData.value = newTemplateData;
        console.log('获取模板2配置数据', res);
        console.log('生成新数据', newTemplateData)
      }).finally(() => {
        loading.value = false
      })
    }


    // tab页面改变事件，恢复默认值
    const onTabChange = () => {
      templateData.value = JSON.parse(JSON.stringify(serverTemplateData))
    }
    // 保存页面按钮事件
    const onSave = () => {
      loading.value = true
      const page = currentTab.value.slice(4);
      const findItem = JSON.parse(JSON.stringify(templateData.value.find(el => el.page == page)))
      const {id} = findItem
      if (id) { // 存在ID，使用更新接口
        const {page, templateId, obj} = findItem
        const param = {
          id,
          page,
          templateId,
          txt: JSON.stringify(obj),
        }
        UI.update(param).then(() => {
          notifySuccess('保存成功')
          getPageInfo()
        }).catch(() => {
          loading.value = false
        })
      } else {  // 不存在ID，使用增加接口
        const {page, templateId, obj} = findItem
        const param = {
          page,
          templateId,
          txt: JSON.stringify(obj),
        }
        UI.insert(param).then(() => {
          notifySuccess('保存成功')
          getPageInfo()
        }).catch(() => {
          loading.value = false
        })
      }
    }

    getPageInfo()
    return {
      loading,
      tabs,
      currentTab,
      currentPanel,
      height,
      onResize,
      onSave,
      onTabChange,
    }
  }
}
</script>
