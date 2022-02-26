<template>
  <top></top>
  <div class="flex1 q-px-lg q-py-lg column no-wrap">
    <p class="text-h6 text-center">扫描二维码即可开柜</p>
    <div class="flex1 row no-wrap justify-around items-center q-mt-md">
      <img
        style="width: 120px"
        src="https://qr.api.cli.im/newqr/create?data=%25E6%25B5%258B%25E8%25AF%2595%25E4%25BA%258C%25E7%25BB%25B4%25E7%25A0%2581&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&logoshape=no&size=500&kid=cliim&key=9e8025bbfbd5c2dfbc672d90c0bd9ca1"
        alt=""
      />
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
