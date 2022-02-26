<template>
  <div class="q-py-sm">
    <q-btn push color="red-5" icon="help_outline">遇到问题？</q-btn>
  </div>
  <q-separator />
  <div
    class="overflow-hidden row q-px-md justify-between items-center no-wrap justify-center"
    style="height: 20%"
  >
    <!-- <div class=""> -->
    <div class="text-no-wrap">
      <div class="text-bold">
        {{ FormData[1] }}
      </div>
      <div class="">
        {{ FormData[2] }}
      </div>
      <div class="">
        {{ FormData[3] }}
      </div>
      <div class="">
        {{ FormData[4] }}
      </div>
    </div>
    <div class="column items-center no-wrap text-no-wrap">
      <div style="width: 60px">
        <img
          class="full-width"
          src="https://qr.api.cli.im/newqr/create?data=%25E6%25B5%258B%25E8%25AF%2595%25E4%25BA%258C%25E7%25BB%25B4%25E7%25A0%2581&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&logoshape=no&size=500&kid=cliim&key=9e8025bbfbd5c2dfbc672d90c0bd9ca1"
          alt=""
        />
      </div>
      <div class="text-bold">{{ FormData[5] }}</div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  props: {
    FormData: {
      type: Object,
      default: () => {
        return {
          1: "西湖公园游客服务中心",
          2: "服务电话：12345678",
          3: "服务时间：08:00-18:00",
          4: "服务地址：西湖公园西湖公园西湖公园",
          5: "智慧西湖小程序",
        };
      },
    },
  },
};
</script>

<style></style>
