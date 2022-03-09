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
      align="left"
      class="full-height text-grey-7"
      indicator-color="transparent"
      inline-label
      mobile-arrows
      no-caps
      outside-arrows
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
      />
    </q-tabs>
    <q-inner-loading :showing="loading" style="z-index: 100">
      <q-spinner-tail color="primary" size="2em"/>
    </q-inner-loading>
  </div>
</template>

<script>
import page1 from "./page1.vue";
import page2 from "./page2.vue";
import page3 from "./page3.vue";
import page4 from "./page4.vue";
import page5 from "./page5.vue";
import page6 from "./page6.vue";
import page7 from "./page7.vue";
import page8 from "./page8.vue";
import page9 from "./page9.vue";
import page10 from "./page10.vue";
import page11 from "./page11.vue";
import page12 from "./page12.vue";
import page13 from "./page13.vue";
import page14 from "./page14.vue";
import page15 from "./page15.vue";
import page16 from "./page16.vue";
import {computed, provide, ref, shallowRef} from 'vue'
import {UI} from "src/api/module";
import {notifySuccess} from "src/util/common";

export default {
  components: {
    page1,
    page2,
    page3,
    page4,
    page5,
    page6,
    page7,
    page8,
    page9,
    page10,
    page11,
    page12,
    page13,
    page14,
    page15,
    page16,
  },
  setup() {
    const loading = ref(false)
    const tabs = [
      {name: "page1", label: "首页"},
      {name: "page2", label: "存"},
      {name: "page3", label: "无法开始状态(1)"},
      {name: "page4", label: "无法开始状态(2)"},
      {name: "page5", label: "使用须知"},
      {name: "page6", label: "确认使用弹窗"},
      {name: "page7", label: "开柜成功"},
      {name: "page8", label: "开柜失败状态(1)"},
      {name: "page9", label: "开柜失败状态(2)"},
      {name: "page10", label: "取"},
      {name: "page11", label: "无法开柜状态"},
      {name: "page12", label: "开柜提示(1)"},
      {name: "page13", label: "开柜提示(2)"},
      {name: "page14", label: "开柜成功"},
      {name: "page15", label: "问题反馈"},
      {name: "page16", label: "问题反馈(1)"},
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
        templateId: 2,
        page: 1,
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州市鼓楼区左海湖滨路70号',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
          id8: '您好，',
          id9: '欢迎使用西湖公园智能储物柜！',
        }
      },
      {
        templateId: 2,
        page: 2,
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州市鼓楼区左海湖滨路70号',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
          id8: '扫描二维码即可开柜',
        }
      },
      {
        templateId: 2,
        page: 3,
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州市鼓楼区左海湖滨路70号',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
          id8: '园区资源有限，带来的不便请您谅解！',
        }
      },
      {
        templateId: 2,
        page: 4,
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州市鼓楼区左海湖滨路70号',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
          id8: '一个账号只能同时使用一个储物柜，请您谅解！',
        }
      },
      {
        templateId: 2,
        page: 5,
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州市鼓楼区左海湖滨路70号',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
          id8: '单次使用储物柜需要消耗',
          id9: '50绿色能量',
          id10: '为方便广大游客使用及园区管控，本储物柜每24小时清空一次， 误清理的物品请联系西湖公园游客中心取回。',
          id11: '存储时间超过4小时，将会被认为是占柜不取行为，系统将扣除一部分文明分。',
        }
      },
      {
        templateId: 2,
        page: 6,
        obj: {
          id1: '是否要消耗',
          id2: '50绿色能量',
          id3: '使用储物柜？',
        }
      },
      {
        templateId: 2,
        page: 7,
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州市鼓楼区左海湖滨路70号',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
          id8: '存储超过4小时将扣减文明分，请留意使用时间。',
        }
      },
      {
        templateId: 2,
        page: 8,
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州市鼓楼区左海湖滨路70号',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
          id8: '您可在西湖游园小程序上获取更多绿色能量。',
        }
      },
      {
        templateId: 2,
        page: 9,
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州市鼓楼区左海湖滨路70号',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
          id8: '您可在西湖游园小程序上获取更多文明分。',
        }
      },
      {
        templateId: 2,
        page: 10,
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州市鼓楼区左海湖滨路70号',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
        }
      },
      {
        templateId: 2,
        page: 11,
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州市鼓楼区左海湖滨路70号',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
        }
      },
      {
        templateId: 2,
        page: 12,
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州市鼓楼区左海湖滨路70号',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
        }
      },
      {
        templateId: 2,
        page: 13,
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州市鼓楼区左海湖滨路70号',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
        }
      },
      {
        templateId: 2,
        page: 14,
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州市鼓楼区左海湖滨路70号',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
        }
      },
      {
        templateId: 2,
        page: 15,
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州市鼓楼区左海湖滨路70号',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
          id8: '若有其他问题请直接致电西湖游客服务中心',
          id9: [
            "柜门无法关闭",
            "柜门关闭后还有物品在柜",
            "扣除绿色能量后柜门未开启",
            "使用未超过4小时被扣除文明分",
            "无法支付绿色能量",
          ],
        }
      },
      {
        templateId: 2,
        page: 16,
        obj: {}
      },
    ])
    provide('templateData', templateData)
    // 获取页面模板保存的数据
    const getPageInfo = () => {
      loading.value = true
      UI.templateInfo({templateId: 2}).then(res => {

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
      // console.log('findItem',findItem)
      const {id} = findItem
      if (id) { // 存在ID，使用更新接口
        const {page, templateId, obj} = findItem
        const param = {
          id,
          page,
          templateId,
          txt: JSON.stringify(obj),
          // obj
        }
        // console.log('更新param', param)
        // return
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
          // obj,
        }
        // console.log('新增param', param)
        // return
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
    };


  },
};
</script>

<style>
.scene {
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
