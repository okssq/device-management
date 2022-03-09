<template>
  <top page="10" />
  <div class="flex1 q-px-lg q-py-lg row no-wrap justify-around">
    <div class="column no-wrap justify-center items-center">
      <div class="text-h6 q-mb-md">扫码开柜</div>
      <div style="width: 80px; height: 100px">
        <img
          class="full-width"
          src="./qrcode.png"
          alt=""
        />
      </div>
    </div>
    <div class="column no-wrap justify-center items-center">
      <div class="text-h6 q-mb-md">密码开柜</div>
      <div style="height: 100px" class="text-center">
        <q-input outlined dense placeholder="输入6位密码" readonly>
          <template #append>
            <q-icon name="keyboard" />
          </template>
        </q-input>
        <q-btn class="q-mt-md" color="grey-6" disable>确定</q-btn>
      </div>
    </div>
  </div>
  <bottom page="10" />
</template>

<script>
import Top from "./top.vue";
import Bottom from "./bottom.vue";
export default {
  components: {
    Top,
    Bottom,
  },
};
</script>
