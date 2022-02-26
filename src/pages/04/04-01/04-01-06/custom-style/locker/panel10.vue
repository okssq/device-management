<template>
  <top></top>
  <div class="flex1 q-px-lg q-py-lg row no-wrap justify-around">
    <div class="column no-wrap justify-center items-center">
      <div class="text-h6 q-mb-md">扫码开柜</div>
      <div style="width: 80px; height: 100px">
        <img
          class="full-width"
          src="https://qr.api.cli.im/newqr/create?data=%25E6%25B5%258B%25E8%25AF%2595%25E4%25BA%258C%25E7%25BB%25B4%25E7%25A0%2581&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&logoshape=no&size=500&kid=cliim&key=9e8025bbfbd5c2dfbc672d90c0bd9ca1"
          alt=""
        />
      </div>
    </div>
    <div class="column no-wrap justify-center items-center">
      <div class="text-h6 q-mb-md">密码开柜</div>
      <div style="height: 100px" class="text-center">
        <q-input outlined dense placeholder="输入6位密码">
          <template #append>
            <q-icon name="keyboard" />
          </template>
        </q-input>
        <q-btn class="q-mt-md" color="green">确定</q-btn>
      </div>
    </div>
  </div>
  <bottom></bottom>
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

<style></style>
