<template>
  <div class="home" :style="{'background-image': `url(${bgImage})`}">
    <home-header />
    <home-contents />
    <home-footer />
  </div>
</template>

<script>
import { computed } from 'vue'
import HomeHeader from '@/components/HomeHeader.vue'
import HomeContents from '@/components/HomeContents.vue'
import HomeFooter from '@/components/HomeFooter.vue'
export default {
  components: {
    HomeHeader,
    HomeContents,
    HomeFooter
  },
  setup() {
    const bgImage = computed(() => require("@/assets/images/background.png"))

    return { bgImage }
  }
}
</script>

<style scoped lang="scss">
.home {
  width: 100vw;
  height: 100vh;
  padding: 1.6rem;
  background-repeat: repeat;
  background-size: cover;
}
</style>