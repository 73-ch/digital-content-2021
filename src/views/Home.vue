<template>
  <div id="home">
    <iframe id="broadcast" src="https://www.youtube.com/embed/FjxH9y9wEE0?controls=0&autoplay=1&mute=1" title="YouTube video player" frameborder="0"></iframe>
    <div class="virtual-screen">
      <dummy id="dummy"/>
    </div>
  </div>
  <calibration v-if="debugMode"/>
</template>

<script>
import {computed} from 'vue'
import Dummy from "@/views/Dummy"
import transformJSON from '@/assets/calibration-data/dummy.json'
import Calibration from '@/components/Calibration.vue'

export default {
  components: {
    Dummy,
    Calibration
  },
  setup() {
    const bgImage = computed(() => require("@/assets/images/background.png"))

    return {bgImage}
  },
  data() {
    return {
      transform: transformJSON,
      debugMode: process.env.NODE_ENV !== "production",
    }
  },
  methods: {
    setVirtualScreen() {
      const targetElement = document.getElementById("dummy");
      targetElement.style.opacity = this.debugMode ? 0.7 : 0.2;
      const parentElement = targetElement.parentElement;
      parentElement.style.transformStyle = "preserve-3d";
      parentElement.style.perspective = this.transform.perspective + "px";
      parentElement.style.transformStyle = "flat";
      targetElement.style.transform = this.transform.transformString;
    }
  },
  mounted() {
    this.setVirtualScreen()
    // window.addEventListener('resize', this.setVirtualScreen)
  }
}
</script>

<style scoped>
#home {
  position: fixed;
}
iframe {
  position: fixed;
  z-index: -5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 177.777vh;
  max-width: 100vw;
  min-height: 56.25vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
}
.virtual-screen {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 56.25vw;
  min-width: 177.777vh;
  width: 100vw;
  height: 100vh;
  /*background-color: red;*/
}
</style>
