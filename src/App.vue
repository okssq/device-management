<template>
  <div
    id="hidden-map"
    class="absolute"
    style="width: 100px; height: 100px; z-index: -1; opacity: 0"
  />
  <router-view />
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    router.push('/login')
  }
};
</script>
