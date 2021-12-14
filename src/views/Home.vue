<template>
  <div id="home">
    <iframe id="broadcast" src="https://www.youtube.com/embed/I8GF-xL2L1g?controls=0&autoplay=1&mute=1" title="YouTube video player" frameborder="0"></iframe>
    <dummy id="dummy"/>
  </div>
  <calibration v-if="debugMode"/>
</template>

<script>
import {computed} from 'vue'
import Dummy from "@/views/Dummy";
import transformJSON from '@/assets/calibration-data/dummytest.json'
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
      targetElement: null,
      parentElement: null,
      transform: transformJSON,
      debugMode: false
    }
  },
  mounted() {
    this.debugMode = process.env.NODE_ENV === "development";

    if (!this.debugMode) {
        let targetElement = document.getElementById("dummy");

        this.targetElement = targetElement;
        this.parentElement = targetElement.parentElement;
        this.parentElement.style.transformStyle = "preserve-3d";
        this.parentElement.style.perspective = this.transform.perspective + "px";

        this.targetElement.style.transform = this.transform.transformString;

        targetElement.style.opacity = 0.0;
    }
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
  width: 100vw;
  height: 100vh;
}
dummy {
  width: 100vw;
  height: 100vh;
  padding: 1.6rem;
  background-repeat: repeat;
  background-size: cover;
  background-color: #777;  
}

</style>
