<template>
  <div class="loading-wrap">
    <div class="hex-wrap">
      <div class="hex" v-for="n in 7" :key="n"></div>
    </div>
    <div class="loading-txt">
      <slot></slot>
    </div>
  </div>
</template>
