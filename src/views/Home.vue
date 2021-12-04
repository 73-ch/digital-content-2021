<template>
  <div id="home" :style="{'background-image': `url(${bgImage})`}">
    <home-header />
    <home-contents />
    <home-footer />
  </div>
  <!-- 外に書く -->
  <calibration />
</template>

<script>
import { computed } from 'vue'
import HomeHeader from '@/components/HomeHeader.vue'
import HomeContents from '@/components/HomeContents.vue'
import HomeFooter from '@/components/HomeFooter.vue'
import Calibration from '@/components/Calibration.vue'
export default {
  components: {
    HomeHeader,
    HomeContents,
    HomeFooter,
    Calibration
  },
  setup() {
    const bgImage = computed(() => require("@/assets/images/background.png"))

    return { bgImage }
  }
}
</script>

<style scoped>
#home {
  width: 100vw;
  height: 100vh;
  padding: 1.6rem;
  background-repeat: repeat;
  background-size: cover;
  background-color: #777;

  position: fixed;
}
calibration {
  visibility: visible; /* キャリブレーション用 */
  /* visibility: visible; 本番用 */
}
</style>
