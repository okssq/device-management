<template>
  <div class="flex1 row no-wrap overflow-hidden relative-position">
    <div class="flex1 column justify-center items-center relative-position overflow-hidden">
      <div :style="{ width: height / 1.4 + 'px', height: height + 'px' }" class="scene column no-wrap">
        <div class="q-ma-sm row no-wrap items-center justify-between">
          <div class="text-red-4 ">
            <q-badge color="red-5" align="middle" transparent class="q-pa-xs">
              <q-icon name="sim_card_alert" color="white" size="18px"/>
              红色部分表示可编辑
            </q-badge>
          </div>
          <q-btn unelevated color="primary" icon="save" label="保存" @click="onSave"/>
        </div>
        <component :is="currentPanel"/>
      </div>
      <q-resize-observer @resize="onResize"/>
    </div>
    <q-separator vertical/>
    <q-tabs
      class="full-height text-grey-7"
      style="width: 200px;min-width: 200px;"
      v-model="currentTab"
      align="left"
      switch-indicator
      vertical
      outside-arrows
      mobile-arrows
      inline-label
      active-color="black"
      active-bg-color="blue-1"
      indicator-color="transparent"
      @update:model-value="onTabChange"
    >
      <q-tab
        v-for="item in tabs"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      />
    </q-tabs>
    <q-inner-loading :showing="loading" style="z-index: 100">
      <q-spinner-tail color="primary" size="2em"/>
    </q-inner-loading>
  </div>
</template>

<script>
import Panel1 from "./panel1.vue";
import Panel2 from "./panel2.vue";
import Panel3 from "./panel3.vue";
import Panel4 from "./panel4.vue";
import Panel5 from "./panel5.vue";
import Panel6 from "./panel6.vue";
import Panel7 from "./panel7.vue";
import Panel8 from "./panel8.vue";
import Panel9 from "./panel9.vue";
import Panel10 from "./panel10.vue";
import Panel11 from "./panel11.vue";
import Panel12 from "./panel12.vue";
import Panel13 from "./panel13.vue";
import Panel14 from "./panel14.vue";
import Panel15 from "./panel15.vue";
import Panel16 from "./panel16.vue";
import {ref, computed, provide, shallowRef} from 'vue'
import {UI} from "src/api/module";
import {notifySuccess} from "src/util/common";

export default {
  components: {
    Panel1,
    Panel2,
    Panel3,
    Panel4,
    Panel5,
    Panel6,
    Panel7,
    Panel8,
    Panel9,
    Panel10,
    Panel11,
    Panel12,
    Panel13,
    Panel14,
    Panel15,
    Panel16,
  },
  setup() {
    const loading = ref(false)
    const tabs = [
      {name: "panel1", label: "首页"},
      {name: "panel2", label: "1.1存"},
      {name: "panel3", label: "1.1.1无法开始状态1"},
      {name: "panel4", label: "1.1.1无法开始状态2"},
      {name: "panel5", label: "1.2使用须知"},
      {name: "panel6", label: "1.2.1确认弹窗"},
      {name: "panel7", label: "1.3.1开柜"},
      {name: "panel8", label: "1.3.2开柜失败状态1"},
      {name: "panel9", label: "1.3.3开柜失败状态2"},
      {name: "panel10", label: "2.1取"},
      {name: "panel11", label: "2.1.1无法开柜状态"},
      {name: "panel12", label: "2.2.1开柜提示1"},
      {name: "panel13", label: "2.2.2开柜提示2"},
      {name: "panel14", label: "2.3开柜成功"},
      {name: "panel15", label: "3.1问题反馈"},
      {name: "panel16", label: "3.1问题反馈-1"},
    ];
    const currentTab = ref("panel1");
    const currentPanel = computed(() => {
      const findItem = tabs.find((el) => el.name === currentTab.value);
      return findItem ? findItem.name : "panel1";
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
          id5: '福州西湖公园',
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
          id5: '福州西湖公园',
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
          id5: '福州西湖公园',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
          id8: '园区资源有限，带来的不变请您谅解！',
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
          id5: '福州西湖公园',
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
          id5: '福州西湖公园',
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
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州西湖公园',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
          id8: '是否要消耗',
          id9: '50绿色能量',
          id10: '使用储物柜？',
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
          id5: '福州西湖公园',
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
          id5: '福州西湖公园',
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
          id5: '福州西湖公园',
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
          id5: '福州西湖公园',
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
          id5: '福州西湖公园',
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
          id5: '福州西湖公园',
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
          id5: '福州西湖公园',
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
          id5: '福州西湖公园',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
          id8: '您可在手机小程序上"我的-储物柜使用"中找到订单相关信息'
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
          id5: '福州西湖公园',
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
        obj: {
          id1: [],
          id2: '西湖公园游客服务中心',
          id3: '12345678',
          id4: '08:00-18:00',
          id5: '福州西湖公园',
          id6: 'https://www.baidu.com',
          id7: '智慧西湖小程序',
        }
      },
    ])
    provide('templateData', templateData)
    // 获取页面模板保存的数据
    const getPageInfo = () => {
      loading.value = true
      UI.templateInfo({templateId: 2}).then(res => {
        const arr = []
        for (let i = 0; i < 16; i++) {
          const item = res[i]
          const localItm = templateData.value[i]
          if (!item) {
            arr.push(localItm)
          } else {
            const {id, page, templateId, txt} = item
            const newItem = {}
            if (id) {
              newItem['id'] = id || localItm['id']
            }
            if (page) {
              newItem['page'] = page || localItm['page']
            }
            if (templateId) {
              newItem['templateId'] = templateId || localItm['templateId']
            }
            if (txt) {
              try{
                let newObj = {}
                const obj = JSON.parse(txt)
                Object.keys(localItm['obj']).forEach(key=>{
                  newObj[key] = obj[key] || localItm['obj'][key]
                })
                newItem['obj'] = newObj
              }catch{
                newItem['obj'] = localItm['obj']
              }
            } else {
              newItem['obj'] = localItm['obj']
            }
            arr.push(newItem)
          }
        }
        serverTemplateData = JSON.parse(JSON.stringify(arr));
        templateData.value = arr;
        console.log('获取模板2配置数据', res);
        console.log('生成新数据', arr)
      }).finally(() => {
        loading.value = false
      })
    }


    // tab页面改变事件，恢复默认值
    const onTabChange = () => {
      templateData.value = JSON.parse(JSON.stringify(serverTemplateData))
      console.log('onTabChange')
    }
    // 保存页面按钮事件
    const onSave = () => {
      loading.value = true
      const page = currentTab.value.slice(-1);
      const findItem = JSON.parse(JSON.stringify(templateData.value.find(el=> el.page = page)))
      const {id} = findItem
      if(id){ // 存在ID，使用更新接口
        const {page,templateId,obj} = findItem
        const param = {
          id,
          page,
          templateId,
          txt: JSON.stringify(obj)
        }
        UI.update(param).then(()=> {
          notifySuccess('保存成功')
          getPageInfo()
        }).catch(() => {
          loading.value = false
        })
      }else{  // 不存在ID，使用增加接口
        const {page,templateId,obj} = findItem
        const param = {
          page,
          templateId,
          txt: JSON.stringify(obj)
        }
        UI.insert(param).then(()=> {
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
