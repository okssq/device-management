<template>
  <div>
    <q-card style="width: 320px">
      <div class="row no-wrap items-center q-px-md q-py-sm">
        <span class="text-subtitle2 text-bold text-primary">
          {{ info ? typeText[info.tmlType] + "-" + info.label : "" }}</span
        >
        <q-space />
        <q-btn
          round
          size="12px"
          icon="clear"
          color="red-5"
          dense
          class="absolute-top-right"
          style="transform: translate(50%, -50%)"
          @click="$emit('close')"
        />
      </div>
      <q-separator />
      <q-list class="text-bold text-grey-10 q-pb-md" dense>
        <q-item>
          <q-item-section side>状态：</q-item-section>
          <q-item-section side v-if="info">
            <q-badge
              :color="info == 0 ? 'grey' : 'green'"
              :label="info == 0 ? '离线' : '在线'"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section side>信息：</q-item-section>
          <q-item-section v-if="info"> {{ info.info }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section side>时间：</q-item-section>
          <q-item-section> 2022/02/01 20:02:02</q-item-section>
        </q-item>
        <q-item>
          <q-item-section side>地址：</q-item-section>
          <q-item-section v-if="info"> {{ info.address }}</q-item-section>
        </q-item>
      </q-list>
      <q-separator />
      <div class="q-pa-sm">
        <div class="text-grey-8">
          <q-btn
            flat
            dense
            icon="slideshow"
            class="q-mr-xs"
            title="视频查看"
            @click="onVideo"
          />
          <q-btn
            flat
            dense
            icon="photo_camera"
            class="q-mr-xs"
            title="照相"
            @click="onPhoto"
          />
          <q-btn
            flat
            dense
            icon="keyboard_voice"
            class="q-mr-xs"
            title="文本下发"
            @click="onTTS"
          />
          <q-btn flat dense icon="volume_up" class="q-mr-xs" title="音量调节">
            <q-popup-proxy>
              <q-list dense padding class="rounded-borders">
                <q-item
                  clickable
                  v-close-popup
                  class="text-grey-7"
                  v-for="item in [0, 20, 40, 60, 80, 100]"
                  :key="item"
                >
                  <q-item-section>{{ item }}%</q-item-section>
                </q-item>
              </q-list>
            </q-popup-proxy>
          </q-btn>
          <q-btn
            flat
            dense
            icon="restart_alt"
            title="重启"
            @click="onReStart"
          />
        </div>
      </div>
    </q-card>

    <!-- 照相 -->
    <q-dialog v-model="dialogPhoto" persistent>
      <q-card>
        <div class="row q-px-md q-py-xs items-center justify-between">
          <div class="text-body1">拍照</div>
          <q-btn flat round size="12px" icon="clear" v-close-popup />
        </div>
        <q-separator />
        <q-card-section style="width: 360px; height: 300px"> </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            dense
            flat
            label="取消"
            color="primary"
            @click="dialogPhoto = false"
          />
          <q-btn
            dense
            label="确定"
            color="primary"
            @click="dialogPhoto = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- 文本下发 -->
    <q-dialog v-model="dialogTTS" persistent>
      <q-card>
        <div class="row q-px-md q-py-xs items-center justify-between">
          <div class="text-body1">文本下发</div>
          <q-btn flat round size="12px" icon="clear" v-close-popup />
        </div>
        <q-separator />
        <q-card-section style="width: 320px">
          <q-input v-model="tts" type="textarea" outlined> </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            dense
            flat
            label="取消"
            color="primary"
            @click="dialogTTS = false"
          />
          <q-btn
            dense
            label="确定"
            color="primary"
            @click="dialogTTS = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- 重启 -->
    <q-dialog v-model="dialogReStart" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            size="40px"
            icon="warning"
            color="deep-orange"
            text-color="white"
          />
          <span class="q-ml-sm text-bold">您确定要重启设备吗？</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            dense
            flat
            label="取消"
            color="primary"
            @click="dialogReStart = false"
          />
          <q-btn
            dense
            label="确定"
            color="primary"
            @click="dialogReStart = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
  emits: ["close", "video"],
  props: {
    info: {
      type: [null, Object],
      default: null,
    },
  },
  setup(props, { emit }) {
    const typeText = {
      1: "大屏",
      2: "打卡桩",
      3: "储物柜",
      4: "座椅",
    };
    const onVideo = () => {
      emit("video");
    };
    const dialogPhoto = ref(false);
    const onPhoto = () => {
      dialogPhoto.value = true;
    };

    const dialogTTS = ref(false);
    const tts = ref("");
    const onTTS = () => {
      tts.value = "";
      dialogTTS.value = true;
    };

    const dialogReStart = ref(false);
    const onReStart = () => {
      dialogReStart.value = true;
    };
    return {
      typeText,

      onVideo,

      dialogPhoto,
      onPhoto,

      dialogTTS,
      tts,
      onTTS,

      dialogReStart,
      onReStart,
    };
  },
};
</script>
