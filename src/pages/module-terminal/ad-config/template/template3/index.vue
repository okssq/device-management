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
        <component :is="currentPanel" v-if="!loading"/>
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
import {ref, computed, provide, shallowRef} from 'vue'
import {UI} from "src/api/module";
import {notifySuccess} from "src/util/common";
export default {
  setup() {
    const loading = ref(false)
    const tabs = [
      {name: "panel1", label: "扫码界面"},
      {name: "panel2", label: "开始投递"},
      {name: "panel3", label: "开始投递-1"},
      {name: "panel4", label: "投递中-1"},
      {name: "panel5", label: "问题反馈"},
      {name: "panel6", label: "问题反馈-1"},
      {name: "panel7", label: "投递结束"},
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
    ])
    provide('templateData', templateData)

    // 获取页面模板保存的数据
    const getPageInfo = () => {
      return
      loading.value = true
      UI.templateInfo({templateId: 3}).then(res => {

        const newTemplateData = []
        const arr = JSON.parse(JSON.stringify(templateData.value))
        arr.forEach(el=> {
          const { page, obj} = el
          const findItem = (res||[]).find(el=> page == el.page)
          if(findItem){
            const {id,txt,templateId} = findItem
            const item = { id,page,templateId }
            if (txt) {
              try{
                let newObj = {}
                const serverObj = JSON.parse(txt)
                Object.keys(obj).forEach(key=>{
                  newObj[key] = serverObj[key] || obj['key']
                })
                item['obj'] = newObj
              }catch{
                item['obj'] = obj
              }
            } else {
              item['obj'] = obj
            }
            newTemplateData.push(item)
          }else{
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
      return
      loading.value = true
      const page = currentTab.value.slice(-1);
      const findItem = JSON.parse(JSON.stringify(templateData.value.find(el=> el.page == page)))
      // console.log('findItem',findItem)
      const {id} = findItem
      if(id){ // 存在ID，使用更新接口
        const {page,templateId,obj} = findItem
        const param = {
          id,
          page,
          templateId,
          txt: JSON.stringify(obj),
          obj
        }
        // console.log('更新param',param)
        // return
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
          txt: JSON.stringify(obj),
          obj,
        }
        // console.log('新增param',param)
        // return
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
    }
  }
}
</script>
