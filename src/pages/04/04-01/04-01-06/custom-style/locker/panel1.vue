<template>
  <top></top>
  <div class="flex1 q-px-lg q-py-lg column no-wrap">
    <p>您好，</p>
    <p>欢迎使用西湖公园智能储物柜！</p>
    <div class="flex1 row no-wrap justify-around items-center q-mt-md">
      <q-btn outline round color="blue-4" size="30px">存</q-btn>
      <q-btn outline round color="orange-4" size="30px">取</q-btn>
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
