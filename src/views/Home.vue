<template>
  <div id="home">
    <iframe id="broadcast" src="https://www.youtube.com/embed/FjxH9y9wEE0?controls=0&autoplay=1&mute=1&rel=0&vq=highres" title="YouTube video player" frameborder="0"></iframe>
    <div class="youtube-hide"></div>
    <div class="virtual-screen">
      <dummy id="dummy" />
    </div>
  </div>
  <calibration v-if="debugMode"/>
  <modal 
    v-if="isModalOpen"
    :isButtonClickable="isWindowLargeEnough"
    @closeModal="closeModal"
  />
</template>

<script>
import {ref, computed} from 'vue'
import Dummy from "@/views/Dummy"
import transformJSON from '@/assets/calibration-data/dummy.json'
import Calibration from '@/components/Calibration.vue'
import Modal from '@/components/Modal.vue'

export default {
  components: {
    Dummy,
    Calibration,
    Modal
  },
  setup() {
    const isModalOpen = ref(false)
    const isWindowLargeEnough = ref(true)
    const bgImage = computed(() => require("@/assets/images/background.png"))

    const closeModal = () => {
      isModalOpen.value = false
    }

    const resizeWindow = () => {
      // ウィンドウサイズがモーダルより大きいか
      // modal width: 1280, modal height: 800
      isWindowLargeEnough.value = window.innerWidth > 1280 && window.innerHeight > 800
      
      // ウィンドウサイズがモーダルサイズより小さいと、モーダルを出す
      if (window.innerWidth <= 1280 && window.innerHeight <= 800) {
        isModalOpen.value = true
      }
    }
    window.addEventListener('resize', resizeWindow)
    resizeWindow() // initial call

    // 一番最初にモーダルを出す
    isModalOpen.value = true

    return { isModalOpen, isWindowLargeEnough, bgImage, closeModal }
  },
  data() {
    return {
      transform: transformJSON,
      debugMode: process.env.NODE_ENV !== "production",
    }
  },
  methods: {
    setDummy() {
      const targetElement = document.getElementById("dummy");
      targetElement.style.opacity = this.debugMode ? 0.7 : 0.0;
      targetElement.style.transform = this.transform.transformString;
    },
    setVirtualScreen() {
      let ratio;
      if (window.innerWidth / 16 * 9 > window.innerHeight) {
        ratio = window.innerWidth / 1600;
      } else {
        ratio = window.innerHeight / 900;
      }
      const virtualScreen = document.getElementsByClassName("virtual-screen")[0];
      virtualScreen.style.transform = `translate(-50%, -50%) scale(${ratio})`;
    }
  },
  mounted() {
    this.setDummy();
    this.setVirtualScreen();
    window.addEventListener('resize', this.setVirtualScreen);
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

.youtube-hide {
  z-index: -2;
  width: 100vw;
  height: 100vh;
}

.virtual-screen {
  position: fixed;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%);
}
</style>
