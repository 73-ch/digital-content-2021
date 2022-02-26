<template>
  <div id="home">
    <h2>{{ youtubeLink }}</h2>
    <iframe id="broadcast" :src="youtubeLink" title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    <div class="youtube-hide"></div>
    <img class="hint-image" src="@/assets/images/hint.png" alt="hint image">

    <div class="virtual-screen">
      <dummy id="dummy"/>
    </div>
  </div>
  <calibration v-if="debugMode"/>
  <modal v-if="isModalOpen" :isButtonClickable="isWindowLargeEnough" @closeModal="closeModal"/>
</template>

<script>
import {ref, computed} from 'vue'
import Dummy from "@/views/Dummy"
import transformJSON from '@/assets/calibration-data/dummy.json'
import Calibration from '@/components/Calibration.vue'
import Modal from '@/components/Modal.vue'
// import ModalFinished from '@/components/ModalFinished.vue'

export default {
  components: {
    Dummy,
    Calibration,
    Modal, // ModalFinished
  },
  setup() {
    const isModalOpen = ref(false)
    const isWindowLargeEnough = ref(true)
    const youtubeLink = ref("")
    const bgImage = computed(() => require("@/assets/images/background.png"))

    const closeModal = () => {
      isModalOpen.value = false
    }

    const resizeWindow = () => {
      // ウィンドウサイズがモーダルより大きいか
      // modal width: 1280, modal height: 800
      isWindowLargeEnough.value = window.innerWidth > 1100 && window.innerHeight > 600

      // ウィンドウサイズがモーダルサイズより小さいと、モーダルを出す
      if (window.innerWidth <= 1100 && window.innerHeight <= 600) {
        isModalOpen.value = true
      }
    }
    window.addEventListener('resize', resizeWindow)
    resizeWindow() // initial call

    // 一番最初にモーダルを出す
    isModalOpen.value = true

    const date = new Date()
    const isAfterNoon = date.getHours() > 12;
    const startTime = (date.getHours() % 12) * 3600 + date.getMinutes() * 60 + date.getSeconds();

    youtubeLink.value = `https://www.youtube.com/embed/?list=PLrtCadD1yHhOxPwJuJ8tmehV4GnCpFICt&index=${+isAfterNoon + 1}&loop=1&autoplay=1&mute=1&rel=0&vq=highres&start=${startTime}`

    return { isModalOpen, isWindowLargeEnough, bgImage, youtubeLink, closeModal }
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
      const parentElement = targetElement.parentElement;
      parentElement.style.transformStyle = "preserve-3d";
      parentElement.style.perspective = "600px";
      parentElement.style.transformStyle = "flat";

      console.log(this.transform);
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

#broadcast {
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

.hint-image {
  position: fixed;
  z-index: -3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 177.777vh;
  max-width: 100vw;
  min-height: 56.25vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  opacity: 0;

  animation: fadeIn 3.0s ease 1.0s 1 normal;
  animation-delay: 10.0s;
  animation-iteration-count: infinite;
}

@keyframes fadeIn { /*animation-nameで設定した値を書く*/

  0% {opacity: 0} /*アニメーション開始時は不透明度0%*/
  50% {opacity: 0.7} /*アニメーション終了時は不透明度100%*/
  100% {opacity: 0} /*アニメーション終了時は不透明度100%*/

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
