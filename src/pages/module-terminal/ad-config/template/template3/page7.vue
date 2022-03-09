<template>
  <div class="full-height column no-wrap relative-position">
    <q-separator/>
    <div class="relative-position bg-grey-1" style="height: 22%">
      <div class="absolute-center text-no-wrap text-grey-6 text-subtitle1">
        广告
      </div>
    </div>
    <q-separator/>
    <div class="bg-grey-1 flex1 q-pa-lg column items-start justify-between no-wrap">
      <div class="full-width row items-center no-wrap">
        <q-btn color="grey-6" disable padding="3px 12px" rounded>
          <q-icon name="arrow_back_ios" size="16px"/>
          返回
        </q-btn>
        <div class="flex1 text-center text-h6" style="margin-left: -40px;">
          问题反馈
        </div>

      </div>
      <div class="full-width">
        <div class="text-subtitle1">
          选择您遇到的问题(可多选)
        </div>
        <div class="text-caption q-mb-md">
          {{ id2Value }}
        </div>
        <div class="q-pa-md row no-wrap items-center justify-between" style="outline: 1px dashed #ccc">
          <div class="q-mr-md">
            <div
              v-for="(item, index) in options"
              :key="index"
              class="row no-wrap items-center"
            >
              <q-checkbox :model-value="false" dense/>
              <div class="row no-wrap items-center">
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="full-width text-center q-mt-md">
          <q-btn color="grey-6" disable padding="6px 60px" rounded size="14px" unelevated>提交</q-btn>
        </div>
      </div>
      <div class="full-width text-no-wrap q-pa-md" style="border: 1px dashed rgb(204, 204, 204)">
        <div class="row no-wrap items-center">
          {{ id4Value }}
        </div>
        <div class="row no-wrap items-center">
          服务电话：{{ id5Value }}
        </div>
        <div class="row no-wrap items-center">
          服务时间：{{ id6Value }}
        </div>
        <div class="row no-wrap items-center">
          服务地址：{{ id7Value }}
        </div>
      </div>
    </div>
    <div class="absolute-full" style="background-color: rgba(0,0,0,.2);">
      <div class="absolute-center shadow-1 bg-white q-pa-md rounded-borders" style="width:60%;">
        <div class="text-right text-grey-6">
          3S后自动关闭
        </div>
        <div class="text-center q-my-md">
          <q-btn color="grey-6" disable icon="o_report_problem" round size="16px"/>
        </div>
        <div class="text-center q-my-md column no-wrap items-center" style="width: 80%;margin-left: 10%;">
          <div>您的问题已被接受，若有必要工作人员将会在三个工作日内联系您。</div>
          <div>若情况紧急，您可拨打园区热线。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {inject, ref} from "vue";

export default {
  setup() {
    const templateData = inject('templateData')
    const itemPage6 = templateData.value.find(el => el.page == 6)
    const id2Value = ref(itemPage6.obj.id2 || '')
    const options = ref((itemPage6 ? JSON.parse(JSON.stringify(itemPage6.obj.id3)) : []) || []);
    const id4Value = ref(itemPage6.obj.id4 || '')
    const id5Value = ref(itemPage6.obj.id5 || '')
    const id6Value = ref(itemPage6.obj.id6 || '')
    const id7Value = ref(itemPage6.obj.id7 || '')


    return {
      id2Value,
      options,
      id4Value,
      id5Value,
      id6Value,
      id7Value,
    };
  },
};
</script>
