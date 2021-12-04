<template>
  <dummy id="dummy"/>
  <!-- 外に書く -->
  <calibration/>
</template>

<script>
import {computed} from 'vue'
import Dummy from "@/views/Dummy";
import Calibration from '@/components/Calibration.vue'

export default {
  components: {
    Dummy,
    Calibration
  },
  setup() {
    const bgImage = computed(() => require("@/assets/images/background.png"))

    return {bgImage}
  }
}
</script>

<style scoped>
dummy {
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
